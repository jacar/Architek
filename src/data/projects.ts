export interface Project {
  id: string
  title: string
  location: string
  category: { es: string; en: string }
  description: { es: string; en: string }
  image: string
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'HOTEL OSH',
    location: 'Cartagena, Colombia',
    category: { es: 'Hotelero', en: 'Hospitality' },
    description: {
      es: 'Desarrollamos el diseño del control de iluminación, la especificación y el suministro de cada componente para uno de los proyectos hoteleros más destacados de la costa colombiana. Un resultado que integra en perfecta sincronía algunas de las marcas más reconocidas del mundo. FLOS · LUTRON · MARSET · LODES ITALIA · HOFFLIGHTS.',
      en: 'We developed the lighting control design, specification and supply of each component for one of the most distinguished hospitality projects on Colombia\'s Caribbean coast. A result that brings together in perfect sync some of the world\'s most recognized brands. FLOS · LUTRON · MARSET · LODES ITALIA · HOFFLIGHTS.'
    },
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&h=1200&fit=crop&auto=format',
  },
  {
    id: '02',
    title: 'RESIDENCIA PRIVADA, ALTO DE LAS PALMAS',
    location: 'Medellín, Colombia',
    category: { es: 'Residencial', en: 'Residential' },
    description: {
      es: 'Proyecto residencial en una de las zonas más exclusivas de Medellín, donde desarrollamos integralmente el diseño de iluminación, el control de iluminación y el suministro de cada componente, incluyendo un sistema de control inteligente que permite crear escenas lumínicas personalizadas y automatización de cortinas Lutron.',
      en: 'Residential project in one of Medellín\'s most exclusive areas, where we delivered the full lighting design, lighting control and supply of every component — including a smart control system for fully personalized lighting scenes and Lutron motorized shading automation.'
    },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=1200&fit=crop&auto=format',
  },
  {
    id: '03',
    title: 'RESIDENCIA PRIVADA, LA RESERVA',
    location: 'Rionegro, Antioquia',
    category: { es: 'Residencial', en: 'Residential' },
    description: {
      es: 'Especificamos y suministramos cada componente de iluminación para esta residencia campestre en Rionegro, Antioquia, integrando el diseño del control de iluminación en una propuesta lumínica que dialoga con el entorno natural y resalta los materiales y texturas de la arquitectura.',
      en: 'We specified and supplied every lighting component for this country residence in Rionegro, Antioquia, integrating the lighting control design into a concept that engages with the natural surroundings and enhances the materials and textures of the architecture.'
    },
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=1200&fit=crop&auto=format',
  },
  {
    id: '04',
    title: 'APARTAMENTO EN MIAMI',
    location: 'Miami, Florida, USA',
    category: { es: 'Residencial', en: 'Residential' },
    description: {
      es: 'Proyecto internacional en Miami. Diseño de iluminación y sistemas de control para apartamento exclusivo. Un trabajo que refleja la proyección internacional de Archtek Studio y su capacidad de operar con los más altos estándares del mercado mundial.',
      en: 'International project in Miami, Florida. Lighting design and control systems for an exclusive apartment — a project that reflects Archtek Studio\'s international reach and its ability to operate at the highest standards of the American market.'
    },
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&h=1200&fit=crop&auto=format',
  },
]
