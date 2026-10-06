// Datos de la DEMO. Productos, tiendas y cifras son de ejemplo.
window.SITE = {
  name: 'Mercado Semu',
  domain: 'mercadosemu.com', // cada creador tiene su subdominio: <sub>.mercadosemu.com
  discount: 5, // % de descuento para el seguidor que usa el código
  // Número de WhatsApp para "Quiero mi página" (formato 240XXXXXXXXX). Vacío = aviso de demo.
  contactWhatsapp: '240555901453'
};

window.INFLUENCERS = {
  katu: {
    slug: 'katu',
    name: 'Katu Entretiene',
    short: 'Katu',
    sub: 'katuentretiene',
    handle: 'katu_entretiene',
    code: 'KATU',
    niche: 'Entretenimiento · Entrevistas en la calle',
    tagline: 'Entrevistas en la calle, preguntas sin filtro y mucho entretenimiento 🎤🇬🇶',
    quote: 'Jesús es el camino, la verdad y la vida',
    followers: '12K',
    followersNum: 12000,
    demoPerDay: 1.6,
    socials: [
      { type: 'instagram', url: 'https://www.instagram.com/katu_entretiene/', label: 'Instagram' },
      { type: 'youtube', url: 'https://www.youtube.com/@katu_entretiene', label: 'YouTube' }
    ],
    theme: {
      bg: '#FFF6E5', surface: '#FFFFFF', ink: '#1D1A16', muted: '#6E6457', line: '#F0E2C8',
      accent: '#E4312B', accentInk: '#FFFFFF', accent2: '#FFC529', display: "'Bricolage Grotesque', sans-serif",
      dark: false
    },
    reels: ['Dd7E5C9RSsG', 'DdmNpOuKwN4', 'Dc-s_qox6bi', 'DdVjZNNq-NX', 'DdYlJomqSTd', 'Ddv7uexqUkB'],
    products: [
      { id: 'k1', name: 'Entrada Fiesta Blanca en la playa', shop: 'Sipopo Beach Events', zone: 'Malabo · Sipopo', price: 5000, img: 'k_fiesta', cat: 'Eventos', comm: 15, desc: 'DJ, música en directo y ambiente de playa. Entrada general, todos de blanco.' },
      { id: 'k2', name: 'Pack de 4 batidos tropicales', shop: 'Jugos Bisila', zone: 'Malabo · Caracolas', price: 5000, img: 'k_batido', cat: 'Comida', comm: 12, desc: 'Fresa, piña y plátano. Recién hechos, sin azúcar añadida. Para compartir.' },
      { id: 'k3', name: 'Helado artesanal (tarrina de 1 litro)', shop: 'Heladería Dulce Malabo', zone: 'Malabo · Centro', price: 4000, img: 'k_helado', cat: 'Comida', comm: 12, desc: 'Dos sabores a elegir. Perfecto para el calor de Malabo.' },
      { id: 'k4', name: 'Gorra snapback roja', shop: 'Street Style GE', zone: 'Malabo · Ela Nguema', price: 8000, img: 'k_gorra', cat: 'Moda', comm: 10, desc: 'Ajustable, visera plana. El estilo de la calle.' },
      { id: 'k5', name: 'Auriculares inalámbricos', shop: 'TecnoMalabo', zone: 'Malabo · Paraíso', price: 15000, img: 'k_auris', cat: 'Tecnología', comm: 8, desc: 'Bluetooth, 20 h de batería y micrófono para llamadas.' },
      { id: 'k6', name: 'Micrófono para el móvil (kit creador)', shop: 'TecnoMalabo', zone: 'Malabo · Paraíso', price: 25000, img: 'k_micro', cat: 'Tecnología', comm: 8, desc: 'Para grabar entrevistas en la calle con buen sonido, como un profesional.' }
    ],
    collabs: [
      { icon: '🎤', title: 'Entrevista callejera patrocinada', text: 'Tu marca dentro de mis entrevistas en la calle, con mención y producto en cámara.' },
      { icon: '⭐', title: 'Reseña de tu negocio', text: 'Voy, lo pruebo y se lo cuento a mis seguidores tal cual.' },
      { icon: '🎉', title: 'Cobertura de tu evento', text: 'Entrevistas y reels desde tu fiesta, concierto o inauguración.' }
    ]
  },

  reina: {
    slug: 'reina',
    name: 'Reina Rilopá',
    short: 'Reina',
    sub: 'reinarilopa',
    handle: 'reina.rilopa',
    code: 'REINA',
    niche: 'Presentadora · Moda y belleza',
    tagline: 'Presentadora de TV y eventos, locutora, actriz y creadora de contenido 🎙️',
    quote: '',
    followers: '19K',
    followersNum: 19000,
    demoPerDay: 1.0,
    socials: [
      { type: 'instagram', url: 'https://www.instagram.com/reina.rilopa/', label: 'Instagram' }
    ],
    theme: {
      bg: '#140A0D', surface: '#1F1115', ink: '#F6ECE4', muted: '#BBA89E', line: '#3A2229',
      accent: '#D8B26E', accentInk: '#1A0E08', accent2: '#C0163F', display: "'Playfair Display', serif",
      dark: true
    },
    reels: ['Ddy9murKeQE', 'DeHMMTSKHUC', 'Dd9ZwxSqb_l', 'DctSD2aK8gA', 'DeE_UfNqCa7', 'DcbP11EKb6u'],
    products: [
      { id: 'r1', name: 'Vestido de noche rojo', shop: 'Boutique Elegance', zone: 'Malabo · Centro', price: 45000, img: 'r_vestido', cat: 'Moda', comm: 10, desc: 'Largo, con vuelo. Para galas, bodas y alfombras rojas.' },
      { id: 'r2', name: 'Paleta de maquillaje profesional', shop: 'Beauty Corner GE', zone: 'Malabo · Ela Nguema', price: 18000, img: 'r_maquillaje', cat: 'Belleza', comm: 12, desc: '35 tonos mate y brillo, pensados para piel morena.' },
      { id: 'r3', name: 'Extensiones de pelo natural', shop: 'Hair Queen Malabo', zone: 'Malabo · Caracolas', price: 60000, img: 'r_peluca', cat: 'Belleza', comm: 10, desc: 'Cabello 100 % natural, ondulado. Colocación incluida en el salón.' },
      { id: 'r4', name: 'Bolso de mano metalizado', shop: 'Boutique Elegance', zone: 'Malabo · Centro', price: 25000, img: 'r_bolso', cat: 'Moda', comm: 10, desc: 'Pequeño y elegante, con cadena dorada.' },
      { id: 'r5', name: 'Perfume de noche (50 ml)', shop: 'Esencias Bioko', zone: 'Malabo · Centro', price: 35000, img: 'r_perfume', cat: 'Belleza', comm: 12, desc: 'Notas de vainilla y oud. Dura toda la noche.' },
      { id: 'r6', name: 'Tacones nude clásicos', shop: 'Shoe Palace', zone: 'Bata · Centro', price: 28000, img: 'r_tacones', cat: 'Moda', comm: 10, desc: 'Tacón de 10 cm, cómodos para estar horas de pie.' }
    ],
    collabs: [
      { icon: '🎤', title: 'Presentación de eventos', text: 'Maestra de ceremonias para galas, lanzamientos, festivales y bodas.' },
      { icon: '🎙️', title: 'Locución publicitaria', text: 'Tu cuña de radio o vídeo con voz profesional.' },
      { icon: '👑', title: 'Imagen de marca', text: 'Embajadora de tu marca en redes, eventos y campañas.' }
    ]
  },

  badpicantero: {
    slug: 'badpicantero',
    name: 'Bad Picantero',
    short: 'Bad Picantero',
    sub: 'badpicantero',
    realName: 'Andy Wap',
    handle: 'bad_picantero01',
    code: 'PICANTE',
    niche: 'Humor · Calle y noche de Malabo',
    tagline: 'Humor, calle y noche de Malabo. Con Dios todo es posible ❤️🇬🇶',
    quote: '',
    followers: '6K',
    followersNum: 6000,
    demoPerDay: 1.3,
    socials: [
      { type: 'instagram', url: 'https://www.instagram.com/bad_picantero01/', label: 'Instagram' },
      { type: 'tiktok', url: 'https://www.tiktok.com/@badpicantero1', label: 'TikTok' }
    ],
    theme: {
      bg: '#0A0A0A', surface: '#161616', ink: '#F4F4F4', muted: '#9C9C9C', line: '#272727',
      accent: '#FF3B1F', accentInk: '#FFFFFF', accent2: '#FFB000', display: "'Anton', sans-serif",
      dark: true, upper: true
    },
    reels: ['DeCiGbuMccx', 'DeH3U4Hs3MX', 'Dd4OZlDsckQ', 'DeH4jwXsfIa', 'Ddj3MbAM2vc', 'Dd0_27Yu3Yv'],
    products: [
      { id: 'b1', name: 'Camiseta oficial BAD PICANTERO', shop: 'Merch de Bad Picantero', zone: 'Malabo', price: 7000, img: 'b_camiseta', cat: 'Merch', comm: 100, own: true, desc: 'Mi propia camiseta. Algodón, tallas S a XXL. Edición limitada 🌶️' },
      { id: 'b2', name: 'Plato combinado: arroz, pollo y plátano', shop: 'Fast Chop Sipopo', zone: 'Malabo · Sipopo', price: 3500, img: 'b_chop', cat: 'Comida', comm: 10, desc: 'Arroz frito, muslo de pollo a la brasa y plátano maduro.' },
      { id: 'b3', name: 'Hamburguesa completa + patatas', shop: 'Burger Night Malabo', zone: 'Malabo · Ela Nguema', price: 3000, img: 'b_burger', cat: 'Comida', comm: 10, desc: 'Abierto hasta las 2:00. Envío a domicilio en Malabo.' },
      { id: 'b4', name: 'Salsa picante casera', shop: 'Picantes de la Abuela', zone: 'Malabo · Los Ángeles', price: 1500, img: 'b_salsa', cat: 'Comida', comm: 15, desc: 'Ají rojo, ajo y limón. Solo para valientes 🔥' },
      { id: 'b5', name: 'Zapatillas pastel', shop: 'Street Style GE', zone: 'Malabo · Ela Nguema', price: 30000, img: 'b_zapas', cat: 'Moda', comm: 8, desc: 'Suela gruesa, tallas 39 a 45.' },
      { id: 'b6', name: 'Altavoz bluetooth portátil', shop: 'TecnoMalabo', zone: 'Malabo · Paraíso', price: 20000, img: 'b_altavoz', cat: 'Tecnología', comm: 8, desc: 'Resistente al agua. La fiesta va contigo a la playa.' }
    ],
    collabs: [
      { icon: '🎤', title: 'Entrevista nocturna con tu marca', text: 'Tu producto en mis entrevistas de calle y de noche.' },
      { icon: '🔥', title: 'Animación de fiestas', text: 'Pongo el ambiente en tu bar, discoteca o evento de playa.' },
      { icon: '📱', title: 'Reel + story', text: 'Un vídeo con tu negocio y mención en historias.' }
    ]
  }
};
