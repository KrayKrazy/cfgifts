export type GiftProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  image: string;
  tags: string[];
};

export type BasketType = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type IndividualItem = {
  id: string;
  name: string;
  price: number;
  category: 'Banho & Corpo' | 'Maquiagem' | 'Acessórios' | 'Afetivos';
};

export const basketTypes: BasketType[] = [
  { id: 'caixa-premium', name: 'Caixa Presente Premium', price: 25.0, image: '/images/caixa-premium.jpg', description: 'Caixa rígida com laço de cetim e papel seda.' },
  { id: 'cesta-vime', name: 'Cesta de Vime Clássica', price: 45.0, image: '/images/cesta-vime.jpg', description: 'Cesta tradicional decorada com flores secas e laço.' },
  { id: 'bandeja-madeira', name: 'Bandeja Rústica', price: 60.0, image: '/images/bandeja-madeira.jpg', description: 'Bandeja de madeira reutilizável com acabamento fino.' },
];

export const individualItems: IndividualItem[] = [
  { id: 'i-1', name: 'Body Splash Cuide-se Bem (200ml)', price: 69.90, category: 'Banho & Corpo' },
  { id: 'i-2', name: 'Loção Hidratante Nativa SPA (400ml)', price: 74.90, category: 'Banho & Corpo' },
  { id: 'i-3', name: 'Perfume Eudora Kiss Me More', price: 119.90, category: 'Banho & Corpo' },
  { id: 'i-4', name: 'Creme para as Mãos', price: 29.90, category: 'Banho & Corpo' },
  { id: 'i-5', name: 'Gloss Labial com Chaveiro', price: 35.00, category: 'Maquiagem' },
  { id: 'i-6', name: 'Kit 4 Pincéis Profissionais', price: 55.00, category: 'Maquiagem' },
  { id: 'i-7', name: 'Lenço Umedecido Demaquilante', price: 15.00, category: 'Maquiagem' },
  { id: 'i-8', name: 'Relógio Feminino Minimalista', price: 89.90, category: 'Acessórios' },
  { id: 'i-9', name: 'Conjunto 2 Pares de Brincos', price: 45.00, category: 'Acessórios' },
  { id: 'i-10', name: 'Pulseira Delicada', price: 35.00, category: 'Acessórios' },
  { id: 'i-11', name: 'Caneca Porcelana "Gratidão"', price: 45.00, category: 'Afetivos' },
  { id: 'i-12', name: 'Cartão com Mensagem Escrita à Mão', price: 15.00, category: 'Afetivos' },
  { id: 'i-13', name: 'Coração de Pelúcia Fofo', price: 25.00, category: 'Afetivos' },
];

export const giftProducts: GiftProduct[] = [
  {
    id: 'cesta-gratidao',
    name: 'Cesta Beauty Gratidão',
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
    name: 'Coleção Linda Sexta',
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
    name: 'Coleção Amor de Mãe',
    price: 94.80,
    description: 'Um carinho preparado para deixar o dia dela ainda mais especial! 🌷',
    items: [
      '01 caneca personalizada na caixinha',
      '01 hidratante corporal Eudora 400 ml'
    ],
    image: '/images/kit-mae.jpg',
    tags: ['Eudora', 'Afetivo']
  },
  {
    id: 'cesta-ameixa',
    name: 'Cesta Spa Nativa Ameixa',
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
    name: 'Coleção Kiss Me More',
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
    name: 'Coleção Floratta Red',
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
    name: 'Cesta Afetiva Deleite',
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
    name: 'Coleção Essencial Cuide-se',
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
    name: 'Cesta Premium Amor & Elegância',
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
