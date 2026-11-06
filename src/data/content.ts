
export const WHATSAPP_NUMBER = '573106056276'

export const OFFER = 'PRIMERA CITA CON 15% OFF'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quiero reservar mi cita en Primitivos')}`

export const services = [
  {
    name: 'MANICURA COMPLETA',
    description: 'Manos impecables, limpieza precisa y cuidado en cada detalle.',
    time: '30 min',
    price: '$35.000',
    img: '/images/manicure.png',
  },
  {
    name: 'PEDICURA',
    description: 'Bienestar desde los pies. Limpieza profunda y cuidado que se nota.',
    time: '1 hora',
    price: '$35.000',
    img: '/images/pedicure.png',
  },
  {
    name: 'COMBO',
    description: 'Manos y pies en una sola sesión. Cuidado completo, sin perder tiempo.',
    time: '1 hora 30 min',
    price: '$68.000',
    oldPrice: '$80.000',
    featured: true,
    img: '/images/Combo.png',
  },
]

export const benefits = [
  { number: '01', title: '100% HECHO PARA HOMBRES', description: 'No adaptamos un spa femenino. Diseñamos uno para ti.' },
  { number: '02', title: 'PRIVACIDAD TOTAL', description: 'Entras tranquilo. Nadie pregunta. Nadie juzga.' },
  { number: '03', title: 'RÁPIDO Y BIEN HECHO', description: 'Cuidado preciso. Sin perder tu tiempo.' },
  { number: '04', title: 'EXPERIENCIA CON ESTILO', description: 'Ambiente sobrio. PS5 mientras hacemos el pedicure.' },
]

export const faqs = [
  { question: '¿ES SOLO PARA HOMBRES?', answer: 'Sí. Primitivos fue creado 100% para hombres.' },
  { question: '¿ME VAN A PINTAR LAS UÑAS?', answer: 'No. A menos que tú quieras. Tú decides el servicio.' },
  { question: '¿CUÁNTO DURA?', answer: 'El tiempo se estipula según tu procedimiento. Llegas, te atendemos y sales listo.' },
  { question: '¿DUELE O ES MUY “DELICADO”?', answer: 'No. Es cuidado preciso. Nada raro. Nada que aguantar.' },
  { question: '¿CÓMO RESERVO Y PUEDO CANCELAR?', answer: 'Reservas aquí o por WhatsApp.' },
  { question: '¿DÓNDE QUEDAN Y CUÁLES SON LOS HORARIOS?', answer: 'Calle 78 # 44-28, Medellín, Antioquia, Valle de Aburrá' },
]
