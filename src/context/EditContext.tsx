import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { proyectosConCover } from '../data/proyectos'

// ---- Types ----
export interface EditableProject {
  id: string
  title: string
  location: string
  category: { es: string; en: string }
  description: { es: string; en: string }
  image: string
}

export interface EditableGalleryProject {
  id: string
  name: string
  location: string
  cover: string
  images?: string[]
  category: { es: string; en: string }
}

export interface EditableSpecialty {
  id: string
  title: { es: string; en: string }
  desc: { es: string; en: string }
}

export interface EditableStep {
  id: string
  title: { es: string; en: string }
  desc: { es: string; en: string }
}

export interface EditableValue {
  titleEs: string
  titleEn: string
  descEs: string
  descEn: string
}

export interface EditableStat {
  value: string
  labelEs: string
  labelEn: string
}

export interface EditableBrandLogo {
  id: string
  name: string
  image: string
}

export interface SiteContent {
  hero: {
    taglineEs: string
    taglineEn: string
    subEs: string
    subEn: string
    bgUrlDark: string
    bgUrlLight: string
    scrollTextEs: string
    scrollTextEn: string
  }
  about: {
    titleEs: string
    titleEn: string
    manifestoEs: string
    manifestoEn: string
    bodyEs: string
    bodyEn: string
    stats: EditableStat[]
    countriesEs: string
    countriesEn: string
    sectorsEs: string
    sectorsEn: string
    values: EditableValue[]
  }
  projects: EditableProject[]
  specialties: {
    titleEs: string
    titleEn: string
    subtitleEs: string
    subtitleEn: string
    items: EditableSpecialty[]
  }
  process: {
    titleEs: string
    titleEn: string
    subtitleEs: string
    subtitleEn: string
    steps: EditableStep[]
  }
  brands: {
    titleEs: string
    titleEn: string
    descEs: string
    descEn: string
    desc2Es: string
    desc2En: string
    logos: EditableBrandLogo[]
  }
  contact: {
    titleEs: string
    titleEn: string
    introEs: string
    introEn: string
    email: string
    location: string
    social: { instagram: string; tiktok: string; linkedin?: string }
  }
  gallery: {
    badgeEs: string
    badgeEn: string
    catalogueTitleEs: string
    catalogueTitleEn: string
    allProjectsTitleEs: string
    allProjectsTitleEn: string
    backHomeTextEs: string
    backHomeTextEn: string
    projects: EditableGalleryProject[]
  }
}

// ---- Default data (pulled from current components) ----
const defaultContent: SiteContent = {
  hero: {
    taglineEs: 'ILUMINACIÓN\nQUE DEFINE\nESPACIOS.',
    taglineEn: 'LIGHTING\nTHAT DEFINES\nSPACES.',
    subEs: 'Diseño de iluminación, control de iluminación y tecnología para proyectos de alta categoría en Colombia y Estados Unidos.',
    subEn: 'Lighting design, control systems and technology for high-end projects across Colombia and the United States.',
    bgUrlDark: 'https://www.archtekstudio.com/wp-content/uploads/2026/09/ChatGPT-Image-26-sept-2026-08_16_44.png',
    bgUrlLight: 'https://www.archtekstudio.com/wp-content/uploads/2026/09/ChatGPT-Image-26-sept-2026-08_13_47-a.m.png',
    scrollTextEs: 'Explorar proyectos',
    scrollTextEn: 'Scroll to explore',
  },
  about: {
    titleEs: 'Sobre nosotros',
    titleEn: 'About us',
    manifestoEs: 'Archtek Studio nació de la pasión por la tecnología, el diseño y la convicción de que la iluminación no es un detalle — es el lenguaje con el que un espacio habla. Con más de 10 años de experiencia desarrollando proyectos en Colombia y Estados Unidos, somos un estudio especializado en diseño de iluminación, sistemas de control de iluminación y tecnología audiovisual para proyectos de alta especificación.',
    manifestoEn: 'Archtek Studio was born from a passion for technology, design and the conviction that lighting is not a detail — it is the language through which a space speaks. With over 10 years of experience delivering projects across Colombia and the United States, we are a studio specializing in lighting design, lighting control systems and audiovisual technology for high-specification projects.',
    bodyEs: 'Nos enfocamos en proyectos donde el diseño, la tecnología y la atención al detalle marcan la diferencia.',
    bodyEn: 'We focus on projects where design, technology and attention to detail make all the difference.',
    stats: [
      { value: '+10', labelEs: 'años de experiencia', labelEn: 'years of experience' },
      { value: '+200', labelEs: 'proyectos ejecutados', labelEn: 'projects delivered' },
    ],
    countriesEs: 'Colombia · Estados Unidos',
    countriesEn: 'Colombia · United States',
    sectorsEs: 'Residencial · Comercial · Hotelero',
    sectorsEn: 'Residential · Commercial · Hospitality',
    values: [
      {
        titleEs: 'Respeto',
        titleEn: 'Respect',
        descEs: 'Cada proyecto y cada cliente merecen nuestra dedicación completa.',
        descEn: 'Every project and every client deserve our full dedication.',
      },
      {
        titleEs: 'Cuidamos cada detalle',
        titleEn: 'Commitment',
        descEs: 'hasta que el resultado sea fiel al diseño.',
        descEn: 'We care for every detail until the result is true to the design.',
      },
      {
        titleEs: 'Somos transparentes',
        titleEn: 'Honesty',
        descEs: 'sobre lo que es posible, y lo que realmente necesita cada proyecto.',
        descEn: 'We are transparent about what is possible, and what each project truly needs.',
      },
    ],
  },
  projects: [
    {
      id: '01',
      title: 'HOTEL OSH',
      location: 'Cartagena, Colombia',
      category: { es: 'Hotelero', en: 'Hospitality' },
      description: {
        es: 'Desarrollamos el diseño del control de iluminación, la especificación y el suministro de cada componente para uno de los proyectos hoteleros más destacados de la costa colombiana. Un resultado que integra en perfecta sincronía algunas de las marcas más reconocidas del mundo. FLOS · LUTRON · MARSET · LODES ITALIA · HOFFLIGHTS.',
        en: 'We developed the lighting control design, specification and supply of each component for one of the most distinguished hospitality projects on Colombia\'s Caribbean coast. A result that brings together in perfect sync some of the world\'s most recognized brands. FLOS · LUTRON · MARSET · LODES ITALIA · HOFFLIGHTS.',
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
        en: 'Residential project in one of Medellín\'s most exclusive areas, where we delivered the full lighting design, lighting control and supply of every component — including a smart control system for fully personalized lighting scenes and Lutron motorized shading automation.',
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
        en: 'We specified and supplied every lighting component for this country residence in Rionegro, Antioquia, integrating the lighting control design into a concept that engages with the natural surroundings and enhances the materials and textures of the architecture.',
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
        en: 'International project in Miami, Florida. Lighting design and control systems for an exclusive apartment — a project that reflects Archtek Studio\'s international reach and its ability to operate at the highest standards of the American market.',
      },
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&h=1200&fit=crop&auto=format',
    },
  ],
  specialties: {
    titleEs: 'Lo que hacemos',
    titleEn: 'What we do',
    subtitleEs: 'Acompañamos cada proyecto desde el diseño, la especificación y el suministro hasta su puesta en marcha, integrando iluminación, control de iluminación y tecnología en una sola visión.',
    subtitleEn: 'We accompany every project from design, specification and supply through to commissioning, integrating lighting, lighting control and technology into a single vision.',
    items: [
      { id: '01', title: { es: 'Diseño de Iluminación', en: 'Lighting Design' }, desc: { es: 'Creamos conceptos lumínicos que elevan cada espacio, equilibrando estética, confort y funcionalidad, garantizando que cada decisión responda a la arquitectura y a la experiencia buscada.', en: 'We craft lighting concepts that elevate every space by balancing aesthetics, comfort and functionality, ensuring every decision responds to the architecture and the intended experience.' } },
      { id: '02', title: { es: 'Sistemas de Control y Automatización', en: 'Control Systems & Automation' }, desc: { es: 'Integramos tecnología de vanguardia para que la iluminación, el audio, el video y otros sistemas operen en perfecta armonía.', en: 'We integrate cutting-edge technology so that lighting, audio, video and other systems operate in perfect harmony — designing intuitive scenes that clients control from their device, with no technical knowledge required.' } },
      { id: '03', title: { es: 'Suministro de Luminarias', en: 'Luminaire Supply' }, desc: { es: 'Diseñamos y especificamos luminarias de marcas aliadas, líderes a nivel mundial, garantizando que cada pieza responda con precisión al diseño, concepto y a la experiencia buscada en cada proyecto.', en: 'We specify and supply luminaires from our allies — world-leading brands — ensuring every piece responds with precision to the concept and the experience sought in each project.' } },
      { id: '04', title: { es: 'Diseño y Especificación del Control de Iluminación', en: 'Lighting Control Design & Specification' }, desc: { es: 'El control de iluminación es lo que transforma una instalación en una experiencia. Diseñamos y especificamos sistemas de control que permiten gestionar cada luminaria con precisión, crear escenas personalizadas y adaptar el ambiente a cada momento de forma intuitiva.', en: 'Lighting control is what transforms an installation into an experience. We design and specify control systems that allow every luminaire to be managed with precision, creating custom scenes and adapting the atmosphere to every moment intuitively.' } },
      { id: '05', title: { es: 'Sistemas de Audio', en: 'Audio Systems' }, desc: { es: 'Diseñamos e instalamos soluciones de audio para cada necesidad: audio distribuido, audio comercial (ambientación de espacios), sistemas de audio surround (cine y multimedia) y audio exterior (jardines y zonas al aire libre).', en: 'We design and install audio solutions for every need: distributed audio, commercial audio (space ambiance), surround audio (home theater and multimedia) and outdoor audio (gardens and open-air areas).' } },
      { id: '06', title: { es: 'Acompañamiento en Obra', en: 'On-Site Supervision' }, desc: { es: 'Supervisamos cada detalle de la instalación y puesta en marcha, garantizando que el resultado final sea fiel al diseño y cumpla con los estándares del proyecto.', en: 'We supervise every detail of the installation and commissioning, ensuring the final result is true to the design and meets the project\'s standards.' } },
    ],
  },
  process: {
    titleEs: 'Cómo trabajamos',
    titleEn: 'How we work',
    subtitleEs: 'Cada gran resultado comienza en la etapa de diseño. La razón es simple: la iluminación no se improvisa — se planea desde el primer trazo.',
    subtitleEn: 'Every great result starts at the design stage. The reason is simple: lighting is not improvised — it is planned from the very first line.',
    steps: [
      { id: '01', title: { es: 'Consulta inicial', en: 'Initial consultation' }, desc: { es: 'Nos cuentas tu proyecto: planos, materiales, tiempos y visión. Analizamos el espacio y entendemos qué tipo de experiencia quieres crear.', en: 'You tell us about your project: blueprints, materials, timeline and vision. We analyze the space and understand what kind of experience you want to create.' } },
      { id: '02', title: { es: 'Diseño del concepto lumínico', en: 'Lighting concept design' }, desc: { es: 'Desarrollamos el diseño de iluminación interpretando cada espacio en su totalidad — su arquitectura, sus materiales y la experiencia que debe generar — para que cada luminaria responda a una intención precisa.', en: 'We develop the lighting design by reading each space in its entirety — its architecture, its materials and the experience it must generate — so that every luminaire responds to a precise intention.' } },
      { id: '03', title: { es: 'Cotización y Especificación', en: 'Quotation & Specification' }, desc: { es: 'Presentamos el presupuesto detallado de diseño y suministro. Seleccionamos las luminarias de nuestro portafolio que mejor responden al concepto del proyecto.', en: 'We present the detailed design and supply budget. We select the luminaires from our portfolio that best respond to the project\'s concept.' } },
      { id: '04', title: { es: 'Suministro y coordinación', en: 'Supply & coordination' }, desc: { es: 'Gestionamos la importación del pedido y la entrega coordinada con los tiempos del proyecto, sincronizando todos los actores para que cada componente llegue en el momento exacto.', en: 'We manage the import and delivery of the order, coordinated with the project timeline — synchronizing all parties so every component arrives at exactly the right moment.' } },
      { id: '05', title: { es: 'Instalación y puesta en marcha', en: 'Installation & commissioning' }, desc: { es: 'Supervisamos la instalación en paralelo con los demás procesos del proyecto y garantizamos que cada componente quede instalado exactamente como lo diseñamos.', en: 'We supervise the installation in parallel with all other project processes, ensuring every component is installed exactly as we designed it.' } },
    ],
  },
  brands: {
    titleEs: 'Nuestros Aliados.',
    titleEn: 'Our Allies',
    descEs: 'Somos distribuidores autorizados de marcas internacionales de alta especificación, diseño, control de iluminación y audio. Esto nos permite ofrecer a nuestros clientes garantía de fábrica real, acceso a lanzamientos exclusivos y soporte técnico certificado.',
    descEn: 'We are authorized distributors of international brands of design and technical precision in lighting, control and audio. This allows us to offer our clients true manufacturer warranty, access to exclusive launches and certified technical support.',
    desc2Es: 'Ser distribuidor autorizado en Colombia y Estados Unidos nos permite respaldar cada proyecto con garantía real, la cual es gestionada directamente por nosotros.',
    desc2En: 'Being an authorized distributor in Colombia and the United States allows us to back every project with a real warranty — managed directly by us, from start to finish.',
    logos: [
      { id: '1',  name: 'Marca 1',  image: new URL('../Marcas Aliadas/1.png',  import.meta.url).href },
      { id: '2',  name: 'Marca 2',  image: new URL('../Marcas Aliadas/2.png',  import.meta.url).href },
      { id: '3',  name: 'Marca 3',  image: new URL('../Marcas Aliadas/3.png',  import.meta.url).href },
      { id: '4',  name: 'Marca 4',  image: new URL('../Marcas Aliadas/4.png',  import.meta.url).href },
      { id: '5',  name: 'Marca 5',  image: new URL('../Marcas Aliadas/5.png',  import.meta.url).href },
      { id: '6',  name: 'Marca 6',  image: new URL('../Marcas Aliadas/6.png',  import.meta.url).href },
      { id: '7',  name: 'Marca 7',  image: new URL('../Marcas Aliadas/7.png',  import.meta.url).href },
      { id: '8',  name: 'Marca 8',  image: new URL('../Marcas Aliadas/8.png',  import.meta.url).href },
      { id: '9',  name: 'Marca 9',  image: new URL('../Marcas Aliadas/9.png',  import.meta.url).href },
      { id: '10', name: 'Marca 10', image: new URL('../Marcas Aliadas/10.png', import.meta.url).href },
      { id: '11', name: 'Marca 11', image: new URL('../Marcas Aliadas/11.png', import.meta.url).href },
      { id: '12', name: 'Marca 12', image: new URL('../Marcas Aliadas/12.png', import.meta.url).href },
      { id: '13', name: 'Marca 13', image: new URL('../Marcas Aliadas/13.png', import.meta.url).href },
      { id: '14', name: 'Marca 14', image: new URL('../Marcas Aliadas/14.png', import.meta.url).href },
      { id: '15', name: 'Marca 15', image: new URL('../Marcas Aliadas/15.png', import.meta.url).href },
      { id: '16', name: 'Marca 16', image: new URL('../Marcas Aliadas/16.png', import.meta.url).href },
      { id: '17', name: 'Marca 17', image: new URL('../Marcas Aliadas/17.png', import.meta.url).href },
      { id: '18', name: 'Marca 18', image: new URL('../Marcas Aliadas/18.png', import.meta.url).href },
      { id: '19', name: 'Marca 19', image: new URL('../Marcas Aliadas/19.png', import.meta.url).href },
    ],
  },
  contact: {
    titleEs: 'Hablemos de tu proyecto',
    titleEn: "Let's talk about your project",
    introEs: 'Si estás desarrollando un proyecto y quieres que la iluminación y la tecnología sean parte de su identidad desde el diseño, este es el momento de contactarnos.',
    introEn: 'If you are developing a project and want lighting and technology to be part of its identity from the design stage, now is the time to reach out.',
    email: 'Sebastian@archtekstudio.com',
    location: 'Colombia · United States',
    social: {
      instagram: 'https://instagram.com/archtekstudio',
      tiktok: 'https://tiktok.com/@archtekstudio',
      linkedin: '',
    },
  },
  gallery: {
    badgeEs: 'ARQUITECTURA EN LUZ & CONTROL',
    badgeEn: 'ARCHITECTURE IN LIGHT & CONTROL',
    catalogueTitleEs: 'Catálogo Completo',
    catalogueTitleEn: 'Complete Catalogue',
    allProjectsTitleEs: 'Todas las Obras',
    allProjectsTitleEn: 'All Projects',
    backHomeTextEs: 'Volver al Inicio',
    backHomeTextEn: 'Back to Home',
    projects: proyectosConCover.map((p) => ({
      id: p.id,
      name: p.name,
      location: p.location,
      cover: p.cover,
      images: p.images,
      category: { ...p.category },
    })),
  },
}

const STORAGE_KEY = 'archtek-site-content-v2'

// ---- Context ----
interface EditContextType {
  content: SiteContent
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void
  resetContent: () => void
  isEditing: boolean
  setIsEditing: (v: boolean) => void
  exportJSON: () => string
}

const EditContext = createContext<EditContextType | undefined>(undefined)

export const EditProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Merge contact, brands and gallery to handle schema evolution
        const contactMerged = {
          ...defaultContent.contact,
          ...(parsed.contact || {}),
          ...((!parsed.contact?.titleEs) ? defaultContent.contact : {}),
        }
        const brandsMerged = {
          ...defaultContent.brands,
          ...(parsed.brands || {}),
          logos: (parsed.brands?.logos && Array.isArray(parsed.brands.logos) && parsed.brands.logos.length > 0
            && parsed.brands.logos.some((l: { image?: string }) => l.image && l.image.trim() !== ''))
            ? parsed.brands.logos
            : defaultContent.brands.logos,
        }
        const galleryMerged = {
          ...defaultContent.gallery,
          ...(parsed.gallery || {}),
          projects: (parsed.gallery?.projects && Array.isArray(parsed.gallery.projects) && parsed.gallery.projects.length > 0)
            ? parsed.gallery.projects
            : defaultContent.gallery.projects,
        }
        return {
          ...defaultContent,
          ...parsed,
          contact: contactMerged,
          brands: brandsMerged,
          gallery: galleryMerged,
        }
      }
    } catch {
      // ignore parse errors
    }
    return defaultContent
  })
  const [isEditing, setIsEditing] = useState(false)

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content])

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    setContent(updater)
  }

  const resetContent = () => {
    setContent(defaultContent)
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportJSON = () => {
    return JSON.stringify(content, null, 2)
  }

  return (
    <EditContext.Provider value={{ content, updateContent, resetContent, isEditing, setIsEditing, exportJSON }}>
      {children}
    </EditContext.Provider>
  )
}

export const useEdit = () => {
  const context = useContext(EditContext)
  if (context === undefined) {
    throw new Error('useEdit must be used within an EditProvider')
  }
  return context
}

export { defaultContent }
