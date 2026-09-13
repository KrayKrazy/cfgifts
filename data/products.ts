export type GiftProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  image: string;
  tags: string[];
};

export const giftProducts: GiftProduct[] = [
  {
    id: 'cesta-gratidao',
    name: 'Cesta Beauty Gratidão (Cuide-se Bem)',
    price: 198.90,
    description: 'Um presente delicado e especial, perfeito para surpreender quem você ama com carinho e cuidado.',
    items: [
      '01 Body Splash Cuide-se Bem de Leite — O Boticário 200 ml',
      '01 Hidratante Corporal — O Boticário 200 ml',
      '01 Caneca personalizada “Gratidão”',
      '04 pincéis para maquiagem',
      '01 gloss com chaveirinho de ursinho super fofo'
    ],
    image: '/images/cesta-gratidao.jpg',
    tags: ['O Boticário', 'Kit Completo']
  },
  {
    id: 'kit-linda-sexta',
    name: 'Kit Skincare Linda Sexta',
    price: 120.00,
    description: 'Um presente delicado e especial para surpreender quem você ama! 💕',
    items: [
      '01 Hidratante corporal',
      '01 Body Splash',
      '01 Hidratante para as mãos',
      '🎀 Embalagem pronta para presentear.'
    ],
    image: '/images/kit-linda-sexta.jpg',
    tags: ['Skincare', 'Promoção']
  },
  {
    id: 'cesta-make-beauty',
    name: 'Cesta Presente Make & Beauty',
    price: 81.90,
    description: 'Um mimo lindo e especial para presentear quem você ama! 🎁',
    items: [
      '01 caneca',
      'Kit de pincéis para maquiagem',
      '01 gloss com chaveirinho',
      '01 lenço umedecido para make',
      '01 cesta presenteável com linda embalagem'
    ],
    image: '/images/cesta-make-beauty.jpg',
    tags: ['Maquiagem', 'Acessórios']
  },
  {
    id: 'kit-mae',
    name: 'Kit Especial Amor de Mãe (Eudora)',
    price: 94.80,
    description: 'Um carinho preparado para deixar o dia dela ainda mais especial! 🌷',
    items: [
      '01 caneca personalizada na caixinha',
      '01 hidratante corporal Eudora 400 ml'
    ],
    image: '/images/kit-mae.jpg',
    tags: ['Eudora', 'Mães']
  },
  {
    id: 'cesta-ameixa',
    name: 'Cesta Spa Nativa SPA Ameixa',
    price: 127.89,
    description: 'Um presente delicado e especial para surpreender quem você ama!',
    items: [
      '03 hidratantes Nativa SPA Ameixa – O Boticário',
      '01 lindo chaveirinho com gloss labial',
      'Linda cesta presenteável, preparada com todo carinho 💝'
    ],
    image: '/images/cesta-ameixa.jpg',
    tags: ['O Boticário', 'Nativa SPA']
  },
  {
    id: 'kit-kiss-me-more',
    name: 'Kit Perfumaria Kiss Me More (Eudora)',
    price: 189.80,
    description: 'Um presente lindo e especial para surpreender quem você ama! 💖',
    items: [
      'Perfume Eudora Kiss Me More',
      'Hidratante corporal',
      'Kit de pincéis para maquiagem',
      'Lenço umedecido'
    ],
    image: '/images/kit-kiss-me-more.jpg',
    tags: ['Eudora', 'Perfumaria']
  },
  {
    id: 'kit-floratta-red',
    name: 'Kit Presente Floratta Red Essencial',
    price: 93.80,
    description: 'Uma combinação linda e delicada para surpreender quem você ama! ❤️',
    items: [
      '01 Body Splash Floratta Red',
      '01 Loção Hidratante Corporal Floratta Red',
      '01 Coração fofo para deixar o presente ainda mais especial'
    ],
    image: '/images/kit-floratta-red.jpg',
    tags: ['O Boticário', 'Floratta']
  },
  {
    id: 'cesta-deleite',
    name: 'Cesta Especial Cuide-se Bem Deleite',
    price: 148.80,
    description: 'Uma linda opção para presentear com carinho e delicadeza! 🎁✨',
    items: [
      '01 Body Splash de Leite',
      '01 Hidratante corporal',
      '01 Caneca de porcelana “Gratidão”, com detalhe de coração',
      '01 Gloss com chaveirinho de ursinho',
      '01 Kit de pincéis para maquiagem',
      'Linda cesta presenteável, finalizada com laço rosa.'
    ],
    image: '/images/cesta-deleite.jpg',
    tags: ['O Boticário', 'Cesta Completa']
  },
  {
    id: 'kit-cuide-se-bem',
    name: 'Kit Hidratação Cuide-se Bem',
    price: 120.00,
    description: 'Uma linda opção para presentear alguém especial! 💕',
    items: [
      '01 Body Splash',
      '01 Hidratante corporal',
      '01 Hidratante para as mãos',
      'Linda cesta presenteável, decorada com carinho 🎀'
    ],
    image: '/images/kit-cuide-se-bem.jpeg',
    tags: ['O Boticário', 'Skincare']
  },
  {
    id: 'kit-amor-elegancia',
    name: 'Kit Premium Amor & Elegância (Com Acessórios)',
    price: 168.90,
    description: 'Uma linda combinação para surpreender quem você ama!',
    items: [
      '01 relógio',
      '02 pares de brincos',
      '01 pulseira',
      'Linda caixinha para os acessórios',
      '01 Body Splash Floratta Red',
      '01 Hidratante corporal'
    ],
    image: '/images/kit-amor-elegancia.jpeg',
    tags: ['O Boticário', 'Acessórios']
  }
];
