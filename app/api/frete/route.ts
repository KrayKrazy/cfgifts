import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cepDestino, totalValue } = await req.json();
    const FRENET_TOKEN = process.env.FRENET_TOKEN;
    if (!FRENET_TOKEN) return NextResponse.json({ error: "Frenet nï¿½o configurado" }, { status: 500 });
    const payload = { SellerCEP: "01000000", RecipientCEP: cepDestino.replace(/\D/g, ""), ShipmentInvoiceValue: totalValue || 100, ShippingItemArray: [ { Weight: 1, Length: 30, Height: 20, Width: 30, Quantity: 1 } ] };
    const res = await fetch("https://api.frenet.com.br/shipping/quote", { method: "POST", headers: { "token": FRENET_TOKEN, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok || !data.ShippingSevicesArray) return NextResponse.json({ error: "Erro ao calcular frete." }, { status: 400 });
    const options = data.ShippingSevicesArray.filter((s: any) => !s.Error).map((s: any) => ({ carrier: s.Carrier, service: s.ServiceDescription, price: parseFloat(s.ShippingPrice), days: parseInt(s.DeliveryTime) }));
    return NextResponse.json({ options });
  } catch (error) { return NextResponse.json({ error: "Erro interno no cï¿½lculo de frete" }, { status: 500 }); }
}