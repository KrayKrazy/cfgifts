'use client';
import { useState } from 'react';
import Image from 'next/image';
import CheckoutModal from './components/CheckoutModal';
import { giftProducts, GiftProduct, basketTypes, individualItems, BasketType, IndividualItem } from '../data/products';

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<GiftProduct | null>(null);
  
  // Custom Basket States
  const [isBuildingCustom, setIsBuildingCustom] = useState(false);
  const [customStep, setCustomStep] = useState<1 | 2 | 3>(1);
  const [selectedBasket, setSelectedBasket] = useState<BasketType | null>(null);
  const [selectedItems, setSelectedItems] = useState<IndividualItem[]>([]);
  const [customMessage, setCustomMessage] = useState('');

  const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const openProduct = (p: GiftProduct) => setActiveProduct(p);
  const closeModal = () => {
    setActiveProduct(null);
    setIsBuildingCustom(false);
    setCustomStep(1);
    setSelectedBasket(null);
    setSelectedItems([]);
    setCustomMessage('');
  };

  const toggleItem = (item: IndividualItem) => {
    setSelectedItems(prev => 
      prev.find(i => i.id === item.id) 
        ? prev.filter(i => i.id !== item.id) 
        : [...prev, item]
    );
  };

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const buyOnWhatsApp = () => { setIsCheckingOut(true); };
  
    const phone = "5511999999999"; // Replace with actual phone
    let text = '';

    if (activeProduct) {
      text = `Olá! Gostaria de encomendar a coleção pronta: *${activeProduct.name}*\nValor: ${fmt(activeProduct.price)}\n\nPoderia me informar sobre a entrega?`;
    } else if (isBuildingCustom && selectedBasket) {
      const itemsTotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
      const total = selectedBasket.price + itemsTotal;
      
      text = `Olá! Montei uma Cesta Personalizada no site:\n\n*Embalagem:* ${selectedBasket.name} (${fmt(selectedBasket.price)})\n*Itens Escolhidos:*\n${selectedItems.map(i => `- ${i.name} (${fmt(i.price)})`).join('\n')}\n\n*Mensagem do Cartão:* "${customMessage || 'Sem mensagem'}"\n\n*Valor Total:* ${fmt(total)}\n\nPoderia me passar os dados de pagamento e entrega?`;
    }

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const customTotal = (selectedBasket?.price || 0) + selectedItems.reduce((acc, curr) => acc + curr.price, 0);

  // Group items by category
  const groupedItems = individualItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, IndividualItem[]>);

  return (
    <div className="min-h-screen text-slate-800 pb-24">
      {/* HEADER */}
      <header className="bg-white border-b border-rose-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-full overflow-hidden border border-rose-100">
              <Image src="/images/logo.jpg" alt="CFgifts Logo" fill className="object-cover" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-rose-600 tracking-tight">CFgifts</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <button className="text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors">Kits Prontos</button>
            <button onClick={() => setIsBuildingCustom(true)} className="text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors">Monte a Sua</button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-rose-50 border-b border-rose-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center relative z-10 animate-slideUp">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-4">Eternize Momentos</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-slate-900 mb-6 max-w-3xl leading-tight">
            Surpreenda com um <i className="text-rose-600">presente único.</i>
          </h2>
          <p className="text-slate-600 max-w-xl md:text-lg mb-10">
            Escolha uma de nossas coleções exclusivas prontas para emocionar, ou monte uma cesta do zero escolhendo cada detalhe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#catalogo" className="bg-white text-rose-600 border border-rose-200 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-rose-50 transition-all duration-300">
              Ver Coleções
            </a>
            <button onClick={() => setIsBuildingCustom(true)} className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-rose-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Montar Cesta Personalizada ✨
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* CATALOGO - COLEÇÕES PRONTAS */}
      <main id="catalogo" className="max-w-7xl mx-auto px-6 pt-20">
        <div className="flex flex-col items-center mb-16 text-center animate-fadeIn">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">Coleções Afetivas</h2>
          <p className="text-slate-500 mt-2">Kits criados com muito carinho e harmonia de produtos.</p>
          <div className="w-16 h-1 bg-rose-300 mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {giftProducts.map((p, i) => (
            <div key={p.id} className="group cursor-pointer flex flex-col animate-slideUp" style={{ animationDelay: `${i * 50}ms` }} onClick={() => openProduct(p)}>
              <div className="relative w-full aspect-[4/5] bg-rose-50 mb-6 overflow-hidden rounded-2xl shadow-sm border border-rose-100/50">
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="bg-white/95 text-rose-600 font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Ver Detalhes
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-2 py-1 rounded-sm border border-rose-100">{t}</span>
                  ))}
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-900 leading-snug group-hover:text-rose-600 transition-colors mb-2">{p.name}</h3>
                <p className="text-rose-600 font-bold text-lg mt-auto">{fmt(p.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL KITS PRONTOS */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-5xl md:rounded-3xl shadow-2xl h-full md:h-[85vh] flex flex-col md:flex-row overflow-hidden relative animate-scaleUp">
            <button onClick={closeModal} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 md:bg-slate-100 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors">✕</button>
            <div className="w-full md:w-1/2 relative bg-rose-50 min-h-[40vh] md:min-h-full">
              <Image src={activeProduct.image} alt={activeProduct.name} fill className="object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col h-full overflow-y-auto bg-white p-6 md:p-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {activeProduct.tags.map(t => <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100">{t}</span>)}
              </div>
              <h2 className="font-serif text-3xl font-bold text-slate-900 leading-tight mb-4">{activeProduct.name}</h2>
              <div className="text-3xl font-bold text-rose-600 mb-6">{fmt(activeProduct.price)}</div>
              <p className="text-slate-600 mb-8 leading-relaxed">{activeProduct.description}</p>
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2"><span>🎁</span> O kit contém:</h4>
                <ul className="space-y-3">
                  {activeProduct.items.map((item, i) => (
                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-rose-400 mt-0.5">•</span>
                      <span dangerouslySetInnerHTML={{ __html: item.replace(/O Boticário/g, '<b>O Boticário</b>').replace(/Eudora/g, '<b>Eudora</b>') }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-100">
                <button onClick={buyOnWhatsApp} className="w-full bg-rose-600 text-white uppercase tracking-widest font-bold text-sm py-4 rounded-xl hover:bg-rose-700 transition-all">Encomendar Coleção</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MONTE SUA CESTA */}
      {isBuildingCustom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-4xl md:rounded-3xl shadow-2xl h-full md:h-[90vh] flex flex-col overflow-hidden relative animate-scaleUp">
            
            <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="font-serif text-2xl font-bold text-slate-800">Monte o seu Presente ✨</h2>
              <button onClick={closeModal} className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors">✕</button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
              
              {/* Progresso */}
              <div className="flex items-center justify-between mb-10 relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
                {[ { n: 1, t: 'Embalagem' }, { n: 2, t: 'Produtos' }, { n: 3, t: 'Cartão & Resumo' } ].map(s => (
                  <div key={s.n} className="flex flex-col items-center gap-2 bg-white px-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${customStep >= s.n ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                      {customStep > s.n ? '✓' : s.n}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${customStep >= s.n ? 'text-rose-600' : 'text-slate-400'}`}>{s.t}</span>
                  </div>
                ))}
              </div>

              {/* STEP 1: Embalagem */}
              {customStep === 1 && (
                <div className="animate-fadeIn">
                  <h3 className="font-serif text-2xl text-slate-800 mb-6">1. Como você quer entregar?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {basketTypes.map(b => (
                      <div key={b.id} onClick={() => setSelectedBasket(b)} className={`cursor-pointer border-2 rounded-2xl p-4 transition-all ${selectedBasket?.id === b.id ? 'border-rose-500 bg-rose-50' : 'border-slate-100 hover:border-rose-300'}`}>
                        {/* Imagem Placeholder - remover div se tiver imagens reais configuradas */}
                        <div className="w-full h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-3xl">{b.name.includes('Caixa') ? '🎁' : b.name.includes('Vime') ? '🧺' : '🪚'}</div>
                        <h4 className="font-bold text-slate-800">{b.name}</h4>
                        <p className="text-xs text-slate-500 mt-1 mb-3 h-8">{b.description}</p>
                        <p className="font-bold text-rose-600">{fmt(b.price)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 flex justify-end">
                    <button onClick={() => setCustomStep(2)} disabled={!selectedBasket} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-rose-600 transition-colors">Avançar →</button>
                  </div>
                </div>
              )}

              {/* STEP 2: Produtos */}
              {customStep === 2 && (
                <div className="animate-fadeIn">
                  <h3 className="font-serif text-2xl text-slate-800 mb-2">2. O que vai dentro?</h3>
                  <p className="text-slate-500 text-sm mb-6">Selecione os produtos para compor o presente perfeito.</p>
                  
                  <div className="space-y-8">
                    {Object.entries(groupedItems).map(([category, items]) => (
                      <div key={category}>
                        <h4 className="font-bold uppercase tracking-wider text-sm text-slate-800 border-b border-slate-100 pb-2 mb-4">{category}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {items.map(item => {
                            const isSelected = selectedItems.some(i => i.id === item.id);
                            return (
                              <div key={item.id} onClick={() => toggleItem(item)} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-rose-500 bg-rose-50' : 'border-slate-200 hover:border-rose-300'}`}>
                                <div>
                                  <span className="block font-medium text-slate-800 text-sm">{item.name}</span>
                                  <span className="block text-rose-600 font-bold text-sm mt-1">{fmt(item.price)}</span>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 text-transparent'}`}>✓</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex justify-between items-center border-t border-slate-100 pt-6">
                    <button onClick={() => setCustomStep(1)} className="text-slate-500 font-bold hover:text-slate-900">← Voltar</button>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-xs text-slate-500">Subtotal ({selectedItems.length} itens)</span>
                        <span className="block font-bold text-xl text-slate-800">{fmt(customTotal)}</span>
                      </div>
                      <button onClick={() => setCustomStep(3)} disabled={selectedItems.length === 0} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-rose-600 transition-colors">Avançar →</button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Resumo e Cartão */}
              {customStep === 3 && (
                <div className="animate-fadeIn">
                  <h3 className="font-serif text-2xl text-slate-800 mb-6">3. Toque Final</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block font-bold text-sm text-slate-800 mb-2">Mensagem do Cartão Afetivo (Opcional)</label>
                      <textarea 
                        value={customMessage} 
                        onChange={e => setCustomMessage(e.target.value)}
                        placeholder="Escreva uma mensagem especial que colocaremos em um lindo cartão à mão..."
                        className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none bg-slate-50"
                      />
                      <p className="text-xs text-slate-400 mt-2">Dica: Declare todo o seu amor e carinho.</p>
                    </div>

                    <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                      <h4 className="font-bold text-slate-800 mb-4 border-b border-rose-200 pb-2">Sua Cesta Personalizada</h4>
                      
                      <div className="flex justify-between items-center text-sm text-slate-700 mb-2">
                        <span>{selectedBasket?.name}</span>
                        <span>{fmt(selectedBasket?.price || 0)}</span>
                      </div>
                      
                      {selectedItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm text-slate-700 mb-2 pl-4 border-l-2 border-rose-200">
                          <span className="truncate pr-2">{item.name}</span>
                          <span>{fmt(item.price)}</span>
                        </div>
                      ))}

                      <div className="flex justify-between items-center font-bold text-lg text-rose-600 mt-6 pt-4 border-t border-rose-200">
                        <span>Total:</span>
                        <span>{fmt(customTotal)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between items-center border-t border-slate-100 pt-6">
                    <button onClick={() => setCustomStep(2)} className="text-slate-500 font-bold hover:text-slate-900">← Editar Itens</button>
                <button onClick={buyOnWhatsApp} className="bg-rose-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-rose-700 hover:shadow-xl hover:-translate-y-1 transition-all flex gap-2 items-center">
                  Finalizar no Checkout 💳
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )}

  {isCheckingOut && (
    <CheckoutModal 
      activeProduct={activeProduct}
      isCustom={isBuildingCustom}
      selectedBasket={selectedBasket}
      selectedItems={selectedItems}
      customMessage={customMessage}
      onClose={() => setIsCheckingOut(false)}
    />
  )}
</div>
  );
}
