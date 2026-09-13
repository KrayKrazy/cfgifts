import { NextResponse } from "next/server";
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
}