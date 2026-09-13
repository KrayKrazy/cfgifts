'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GiftProduct, BasketType, IndividualItem } from '../../data/products';

type CheckoutProps = {
  activeProduct?: GiftProduct | null;
  isCustom?: boolean;
  selectedBasket?: BasketType | null;
  selectedItems?: IndividualItem[];
  customMessage?: string;
  onClose: () => void;
};

export default function CheckoutModal({ activeProduct, isCustom, selectedBasket, selectedItems, customMessage, onClose }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', cpf: '' });
  const [shipping, setShipping] = useState({ cep: '', service: '', price: 0, street: '', number: '', neighborhood: '', city: '', state: '' });
  const [payment, setPayment] = useState({ method: 'pix', cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '', installments: 1 });
  
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pixData, setPixData] = useState<{ pixCode: string, qrCodeUrl: string } | null>(null);

  const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const productTotal = isCustom 
    ? (selectedBasket?.price || 0) + (selectedItems?.reduce((a, b) => a + b.price, 0) || 0)
    : (activeProduct?.price || 0);

  const totalFinal = productTotal + shipping.price;

  const handleCepSearch = async () => {
    if (shipping.cep.replace(/\D/g, '').length !== 8) return;
    setIsLoading(true);
    try {
      // ViaCEP
      const res = await fetch(https://viacep.com.br/ws/ + shipping.cep.replace(/\D/g, '') + /json/);
      const data = await res.json();
      if (!data.erro) {
        setShipping(s => ({ ...s, street: data.logradouro, neighborhood: data.bairro, city: data.localidade, state: data.uf }));
      }
      
      // Frenet
      const freteRes = await fetch('/api/frete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cepDestino: shipping.cep, totalValue: productTotal })
      });
      const freteData = await freteRes.json();
      if (freteData.options) setShippingOptions(freteData.options);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const submitCheckout = async () => {
    setIsLoading(true);
    try {
      const itemsPayload = isCustom ? 
        selectedItems?.map(i => ({ name: i.name, price: i.price, offerId: i.id }))
        : [{ name: activeProduct?.name, price: activeProduct?.price, offerId: activeProduct?.id }];

      const payload = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        docNumber: customer.cpf,
        items: itemsPayload,
        total: totalFinal,
        shipping: {
          cep: shipping.cep,
          service: shipping.service,
          price: shipping.price,
          carrier: shipping.service
        },
        address: shipping,
        paymentMethod: payment.method,
        installments: payment.installments,
        card: payment.method === 'credit_card' ? {
          number: payment.cardNumber,
          holderName: payment.cardName,
          expMonth: payment.cardExpiry.split('/')[0],
          expYear: payment.cardExpiry.split('/')[1],
          cvv: payment.cardCvv
        } : undefined
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success && payment.method === 'pix') {
        setPixData({ pixCode: data.pixCode, qrCodeUrl: data.qrCodeUrl });
        setStep(4); // Pix Screen
      } else if (data.success) {
        alert("Pagamento Aprovado com Sucesso! ??");
        onClose();
      } else {
        alert(data.error || "Erro ao processar pagamento.");
      }
    } catch (e) {
      alert("Erro na comunicação com o servidor.");
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl md:rounded-3xl shadow-2xl h-full md:h-[90vh] flex flex-col overflow-hidden relative">
        <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-rose-50">
          <h2 className="font-serif text-xl font-bold text-rose-700">Finalizar Compra Segura</h2>
          <button onClick={onClose} className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors">?</button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {step === 1 && (
            <div className="space-y-4 animate-slideUp">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2">1. Seus Dados</h3>
              <input type="text" placeholder="Nome Completo" className="w-full p-3 border rounded-xl" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
              <input type="email" placeholder="E-mail" className="w-full p-3 border rounded-xl" value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} />
              <input type="text" placeholder="WhatsApp" className="w-full p-3 border rounded-xl" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} />
              <input type="text" placeholder="CPF" className="w-full p-3 border rounded-xl" value={customer.cpf} onChange={e => setCustomer({...customer, cpf: e.target.value})} />
              <button onClick={() => setStep(2)} className="w-full bg-rose-600 text-white p-4 rounded-xl font-bold hover:bg-rose-700 mt-4">Continuar para Entrega</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-slideUp">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2">2. Endereço de Entrega</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="CEP" className="flex-1 p-3 border rounded-xl" value={shipping.cep} onChange={e => setShipping({...shipping, cep: e.target.value})} onBlur={handleCepSearch} />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <input type="text" placeholder="Rua" className="col-span-3 p-3 border rounded-xl" value={shipping.street} onChange={e => setShipping({...shipping, street: e.target.value})} />
                <input type="text" placeholder="Nº" className="col-span-1 p-3 border rounded-xl" value={shipping.number} onChange={e => setShipping({...shipping, number: e.target.value})} />
              </div>
              
              {shippingOptions.length > 0 && (
                <div className="mt-4 p-4 bg-slate-50 border rounded-xl space-y-2">
                  <h4 className="font-bold text-sm text-slate-700 mb-2">Opções de Frete (Frenet)</h4>
                  {shippingOptions.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer bg-white hover:border-rose-300">
                      <input type="radio" name="frete" onChange={() => setShipping({...shipping, price: opt.price, service: opt.service})} />
                      <div className="flex-1">
                        <span className="block font-bold text-sm">{opt.service}</span>
                        <span className="block text-xs text-slate-500">{opt.days} dias úteis</span>
                      </div>
                      <span className="font-bold text-rose-600">{fmt(opt.price)}</span>
                    </label>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2 mt-6">
                <button onClick={() => setStep(1)} className="px-4 py-3 border rounded-xl font-bold text-slate-500">Voltar</button>
                <button onClick={() => setStep(3)} disabled={shipping.price === 0} className="flex-1 bg-rose-600 text-white p-3 rounded-xl font-bold disabled:opacity-50">Continuar para Pagamento</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-slideUp">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2">3. Pagamento</h3>
              
              <div className="flex gap-4 mb-4">
                <label className={lex-1 p-4 border rounded-xl cursor-pointer text-center font-bold }>
                  <input type="radio" className="hidden" checked={payment.method === 'pix'} onChange={() => setPayment({...payment, method: 'pix'})} />
                  PIX (Aprovação Imediata)
                </label>
                <label className={lex-1 p-4 border rounded-xl cursor-pointer text-center font-bold }>
                  <input type="radio" className="hidden" checked={payment.method === 'credit_card'} onChange={() => setPayment({...payment, method: 'credit_card'})} />
                  Cartão de Crédito
                </label>
              </div>

              {payment.method === 'credit_card' && (
                <div className="space-y-3 bg-slate-50 p-4 border rounded-xl">
                  <input type="text" placeholder="Número do Cartão" className="w-full p-3 border rounded-lg" value={payment.cardNumber} onChange={e => setPayment({...payment, cardNumber: e.target.value})} />
                  <input type="text" placeholder="Nome Impresso" className="w-full p-3 border rounded-lg" value={payment.cardName} onChange={e => setPayment({...payment, cardName: e.target.value})} />
                  <div className="flex gap-2">
                    <input type="text" placeholder="MM/AA" className="w-1/2 p-3 border rounded-lg" value={payment.cardExpiry} onChange={e => setPayment({...payment, cardExpiry: e.target.value})} />
                    <input type="text" placeholder="CVV" className="w-1/2 p-3 border rounded-lg" value={payment.cardCvv} onChange={e => setPayment({...payment, cardCvv: e.target.value})} />
                  </div>
                  <select className="w-full p-3 border rounded-lg" value={payment.installments} onChange={e => setPayment({...payment, installments: Number(e.target.value)})}>
                    <option value={1}>1x de {fmt(totalFinal)}</option>
                    <option value={2}>2x de {fmt(totalFinal/2)}</option>
                    <option value={3}>3x de {fmt(totalFinal/3)}</option>
                  </select>
                </div>
              )}

              <div className="mt-8 border-t pt-4">
                <div className="flex justify-between text-sm mb-1 text-slate-600"><span>Subtotal</span> <span>{fmt(productTotal)}</span></div>
                <div className="flex justify-between text-sm mb-3 text-slate-600"><span>Frete ({shipping.service})</span> <span>{fmt(shipping.price)}</span></div>
                <div className="flex justify-between text-xl font-bold text-slate-800"><span>Total</span> <span className="text-rose-600">{fmt(totalFinal)}</span></div>
              </div>

              <div className="flex gap-2 mt-6">
                <button onClick={() => setStep(2)} className="px-4 py-3 border rounded-xl font-bold text-slate-500">Voltar</button>
                <button onClick={submitCheckout} disabled={isLoading} className="flex-1 bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50">
                  {isLoading ? 'Processando...' : payment.method === 'pix' ? 'Gerar PIX' : 'Pagar Agora'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && pixData && (
            <div className="text-center space-y-6 animate-scaleUp py-10">
              <h3 className="font-serif font-bold text-2xl text-green-600">Pedido Realizado!</h3>
              <p className="text-slate-600">Escaneie o QR Code abaixo para pagar via PIX.</p>
              <div className="flex justify-center">
                <img src={pixData.qrCodeUrl} alt="QR Code PIX" className="w-64 h-64 border rounded-2xl shadow-lg p-2" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-2">Ou copie o código (Pix Copia e Cola):</p>
                <input type="text" readOnly value={pixData.pixCode} className="w-full p-3 text-xs border rounded-lg bg-slate-50 text-center" />
              </div>
              <button onClick={() => { navigator.clipboard.writeText(pixData.pixCode); alert('Copiado!'); }} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black">Copiar Código</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
