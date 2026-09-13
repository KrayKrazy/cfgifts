'use client';

import { useState } from 'react';
import Image from 'next/image';
import { giftProducts, GiftProduct } from '../data/products';

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<GiftProduct | null>(null);

  const fmt = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const openProduct = (p: GiftProduct) => {
    setActiveProduct(p);
  };

  const closeModal = () => {
    setActiveProduct(null);
  };

  const buyOnWhatsApp = () => {
    if (!activeProduct) return;
    const phone = "5511999999999"; // Replace with actual phone
    const text = `Olá! Gostaria de encomendar o presente: *${activeProduct.name}*\nValor: ${fmt(activeProduct.price)}\n\nPoderia me informar sobre a entrega?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen text-slate-800 pb-24">
      {/* HEADER */}
      <header className="bg-white border-b border-rose-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo placeholder */}
            <div className="w-10 h-10 relative rounded-full overflow-hidden border border-rose-100">
              <Image src="/images/logo.jpg" alt="CFgifts Logo" fill className="object-cover" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-rose-600 tracking-tight">CFgifts</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <button className="text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors">Início</button>
            <button className="text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors">Kits e Cestas</button>
            <button className="text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors">Contato</button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-rose-50 border-b border-rose-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center relative z-10 animate-slideUp">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-4">Eternize Momentos</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-slate-900 mb-6 max-w-2xl leading-tight">
            Entregamos <i className="text-rose-600">carinho</i> em forma de presente.
          </h2>
          <p className="text-slate-600 max-w-xl md:text-lg mb-10">
            Surpreenda quem você ama com nossas cestas exclusivas e kits de beleza selecionados a dedo.
          </p>
          <a href="#catalogo" className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-rose-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Ver Presentes
          </a>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300 rounded-full blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* CATALOGO */}
      <main id="catalogo" className="max-w-7xl mx-auto px-6 pt-20">
        <div className="flex flex-col items-center mb-16 text-center animate-fadeIn">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">Coleção Especial</h2>
          <div className="w-16 h-1 bg-rose-300 mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {giftProducts.map((p, i) => (
            <div key={p.id} className="group cursor-pointer flex flex-col animate-slideUp" style={{ animationDelay: `${i * 50}ms` }} onClick={() => openProduct(p)}>
              <div className="relative w-full aspect-[4/5] bg-rose-50 mb-6 overflow-hidden rounded-2xl shadow-sm border border-rose-100/50">
                <Image 
                  src={p.image} 
                  alt={p.name} 
                  fill 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Overlay Hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="bg-white/95 text-rose-600 font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Ver Detalhes
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-2 py-1 rounded-sm border border-rose-100">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif font-bold text-xl text-slate-900 leading-snug group-hover:text-rose-600 transition-colors mb-2">
                  {p.name}
                </h3>
                <p className="text-rose-600 font-bold text-lg mt-auto">{fmt(p.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL DE PRODUTO */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-5xl md:rounded-3xl shadow-2xl h-full md:h-[85vh] flex flex-col md:flex-row overflow-hidden relative animate-scaleUp">
            
            <button onClick={closeModal} className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 md:bg-slate-100 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors shadow-sm">
              ✕
            </button>

            {/* Imagem (Esquerda) */}
            <div className="w-full md:w-1/2 relative bg-rose-50 min-h-[40vh] md:min-h-full">
              <Image src={activeProduct.image} alt={activeProduct.name} fill className="object-cover" />
            </div>

            {/* Conteúdo (Direita) */}
            <div className="w-full md:w-1/2 flex flex-col h-full overflow-y-auto bg-white p-6 md:p-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {activeProduct.tags.map(t => (
                  <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100">
                    {t}
                  </span>
                ))}
              </div>
              
              <h2 className="font-serif text-3xl font-bold text-slate-900 leading-tight mb-4">{activeProduct.name}</h2>
              <div className="text-3xl font-bold text-rose-600 mb-6">{fmt(activeProduct.price)}</div>
              
              <p className="text-slate-600 mb-8 leading-relaxed">
                {activeProduct.description}
              </p>

              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                  <span>🎁</span> O kit contém:
                </h4>
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
                <button onClick={buyOnWhatsApp} className="w-full bg-rose-600 text-white uppercase tracking-widest font-bold text-sm py-4 rounded-xl hover:bg-rose-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  Encomendar pelo WhatsApp
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Pagamento e entrega combinados diretamente com nossa equipe.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
