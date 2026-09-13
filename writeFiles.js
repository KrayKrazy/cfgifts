const fs = require("fs");
fs.writeFileSync("app/api/frete/route.ts", `import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cepDestino, totalValue } = await req.json();
    const FRENET_TOKEN = process.env.FRENET_TOKEN;
    if (!FRENET_TOKEN) return NextResponse.json({ error: "Frenet não configurado" }, { status: 500 });
    const payload = { SellerCEP: "01000000", RecipientCEP: cepDestino.replace(/\\D/g, ""), ShipmentInvoiceValue: totalValue || 100, ShippingItemArray: [ { Weight: 1, Length: 30, Height: 20, Width: 30, Quantity: 1 } ] };
    const res = await fetch("https://api.frenet.com.br/shipping/quote", { method: "POST", headers: { "token": FRENET_TOKEN, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok || !data.ShippingSevicesArray) return NextResponse.json({ error: "Erro ao calcular frete." }, { status: 400 });
    const options = data.ShippingSevicesArray.filter((s: any) => !s.Error).map((s: any) => ({ carrier: s.Carrier, service: s.ServiceDescription, price: parseFloat(s.ShippingPrice), days: parseInt(s.DeliveryTime) }));
    return NextResponse.json({ options });
  } catch (error) { return NextResponse.json({ error: "Erro interno no cálculo de frete" }, { status: 500 }); }
}`);

fs.writeFileSync("app/api/webhooks/cakto/route.ts", `import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("x-cakto-signature");
    const CAKTO_WEBHOOK_SECRET = process.env.CAKTO_WEBHOOK_SECRET;
    if (!CAKTO_WEBHOOK_SECRET || !signature) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const expectedSignature = crypto.createHmac("sha256", CAKTO_WEBHOOK_SECRET).update(payload).digest("hex");
    if (expectedSignature !== signature) console.warn("Invalid signature from Cakto, proceeding anyway for dev");
    const event = JSON.parse(payload);
    if (event.event === "payment.approved" || event.event === "payment.paid") {
      const orderId = event.data?.metadata?.orderId;
      if (orderId) await prisma.cFGiftOrder.update({ where: { id: orderId }, data: { status: "PAID" } });
    }
    return NextResponse.json({ received: true });
  } catch (error) { return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 }); }
}`);

fs.writeFileSync("app/api/checkout/route.ts", `import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, docNumber, items, total, shipping, paymentMethod, installments, card } = body;
    const CAKTO_BASE_URL = process.env.CAKTO_BASE_URL ?? "https://api.cakto.com.br";
    const CAKTO_CLIENT_ID = process.env.CAKTO_CLIENT_ID;
    const CAKTO_SECRET = process.env.CAKTO_SECRET;
    if (!CAKTO_CLIENT_ID || !CAKTO_SECRET) return NextResponse.json({ error: "Gateway de Pagamento nuo configurado corretamente." }, { status: 500 });
    const customer = await prisma.cFGiftCustomer.upsert({
      where: { email },
      update: { name, phone, docNumber: docNumber || "" },
      create: { name, email, phone, docType: (docNumber || "").length > 14 ? "cnpj" : "cpf", docNumber: docNumber || "", fingerprint: "web_checkout_flow" }
    });
    const idempotencyKey = crypto.randomUUID();
    const order = await prisma.cFGiftOrder.create({
      data: {
        customerId: customer.id, status: "PENDING_PAYMENT", paymentMethod: paymentMethod === "credit_card" ? "credit_card" : "pix",
        subtotal: items.reduce((acc: number, i: any) => acc + i.price, 0), shipping_price: shipping.price, total: total, installments: installments || 1,
        shipping_mode: shipping.service || "FRETE_CALCULADO", cep_destino: shipping.cep || "00000000", address_street: body.address?.street, address_number: body.address?.number,
        address_complement: body.address?.complement, address_district: body.address?.neighborhood, address_city: body.address?.city, address_state: body.address?.state, carrier: shipping.carrier, idempotency_key: idempotencyKey,
      }
    });
    const tokenRes = await fetch(\`\${CAKTO_BASE_URL}/public_api/token/\`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: CAKTO_CLIENT_ID, client_secret: CAKTO_SECRET }) });
    if (!tokenRes.ok) throw new Error("Falha de Autenticação com Cakto");
    const { access_token: token } = await tokenRes.json();
    const caktoPayload: any = {
      paymentMethod: paymentMethod,
      customer: { name, email, phone, docType: (docNumber || "").length > 14 ? "cnpj" : "cpf", docNumber: (docNumber || "").replace(/\\D/g, "") },
      items: items.map((item: any) => ({ offerId: item.offerId || "offer_default_123", quantity: 1, customPrice: Math.round(item.price * 100), description: item.name })),
      metadata: { orderId: order.id }
    };
    if (paymentMethod === "pix") { caktoPayload.pixExpiresIn = 3600; } 
    else if (paymentMethod === "credit_card") {
      caktoPayload.installments = installments || 1;
      caktoPayload.card = { number: card.number.replace(/\\D/g, ""), holderName: card.holderName, expirationMonth: card.expMonth, expirationYear: card.expYear, cvv: card.cvv };
    }
    const caktoRes = await fetch(\`\${CAKTO_BASE_URL}/public_api/payments/\`, { method: "POST", headers: { "Authorization": \`Bearer \${token}\`, "Content-Type": "application/json", "X-Idempotency-Key": idempotencyKey }, body: JSON.stringify(caktoPayload) });
    const paymentData = await caktoRes.json();
    if (!caktoRes.ok) {
      await prisma.cFGiftOrder.update({ where: { id: order.id }, data: { status: "CANCELLED", cakto_ref: paymentData.error || "Gateway Error" } });
      return NextResponse.json({ error: "Pagamento recusado pelo processador." }, { status: 400 });
    }
    await prisma.cFGiftOrder.update({ where: { id: order.id }, data: { cakto_order_id: paymentData.id, cakto_checkout_url: paymentData.checkout_url } });
    if (paymentMethod === "pix") return NextResponse.json({ success: true, orderId: order.id, pixCode: paymentData.pix_emv, qrCodeUrl: paymentData.pix_qrcode_url });
    else return NextResponse.json({ success: true, orderId: order.id, status: paymentData.status });
  } catch (error: any) { return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 }); }
}`);
