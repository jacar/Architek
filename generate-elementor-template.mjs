import fs from 'fs';
import path from 'path';

// Helper to generate unique Elementor IDs
function genId() {
  return Math.random().toString(36).substring(2, 9);
}

// Global styling constants matching Archtek Studio design
const COLORS = {
  bg: '#0c0c0c',
  surface: '#141414',
  surfaceAlt: '#1a1a1a',
  text: '#f0ece6',
  muted: 'rgba(240, 236, 230, 0.65)',
  subtle: 'rgba(240, 236, 230, 0.4)',
  accent: '#c9a050', // Warm gold / architectural accent
  border: 'rgba(240, 236, 230, 0.1)',
};

// --- SECTION 1: HERO ---
function buildHeroSection() {
  const bgImg = 'https://www.archtekstudio.com/wp-content/uploads/2026/09/ChatGPT-Image-26-sept-2026-08_16_44.png';
  return {
    id: genId(),
    elType: 'section',
    isInner: false,
    settings: {
      layout: 'full_width',
      height: 'min-height',
      custom_height: { size: 100, unit: 'vh' },
      background_background: 'classic',
      background_image: {
        url: bgImg,
        id: ''
      },
      background_position: 'center center',
      background_size: 'cover',
      background_overlay_background: 'classic',
      background_overlay_color: 'rgba(12, 12, 12, 0.75)',
      padding: { top: '120', right: '40', bottom: '100', left: '40', unit: 'px', isLinked: false }
    },
    elements: [
      {
        id: genId(),
        elType: 'column',
        settings: {
          _column_size: 100,
          content_position: 'middle'
        },
        elements: [
          // Pretitle / Category
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'heading',
            settings: {
              title: 'DISEÑO DE ILUMINACIÓN · CONTROL · TECNOLOGÍA',
              header_size: 'p',
              title_color: COLORS.accent,
              typography_typography: 'custom',
              typography_font_family: 'DM Sans',
              typography_font_size: { size: 13, unit: 'px' },
              typography_font_weight: '600',
              typography_letter_spacing: { size: 4, unit: 'px' },
              _margin: { bottom: '20', unit: 'px' }
            }
          },
          // Main Headline
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'heading',
            settings: {
              title: 'ILUMINACIÓN<br>QUE DEFINE<br>ESPACIOS.',
              header_size: 'h1',
              title_color: COLORS.text,
              typography_typography: 'custom',
              typography_font_family: 'Playfair Display',
              typography_font_size: { size: 76, unit: 'px' },
              typography_font_size_tablet: { size: 54, unit: 'px' },
              typography_font_size_mobile: { size: 38, unit: 'px' },
              typography_font_weight: '700',
              typography_line_height: { size: 1.05, unit: 'em' },
              typography_letter_spacing: { size: -1, unit: 'px' },
              _margin: { bottom: '25', unit: 'px' }
            }
          },
          // Description
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'text-editor',
            settings: {
              editor: '<p>Diseño de iluminación, control de iluminación y tecnología para proyectos de alta categoría en Colombia y Estados Unidos.</p>',
              text_color: COLORS.muted,
              typography_typography: 'custom',
              typography_font_family: 'DM Sans',
              typography_font_size: { size: 18, unit: 'px' },
              typography_line_height: { size: 1.6, unit: 'em' },
              _margin: { bottom: '40', unit: 'px' }
            }
          },
          // CTA Buttons (Inner Section)
          {
            id: genId(),
            elType: 'section',
            isInner: true,
            settings: {
              gap: 'extended'
            },
            elements: [
              {
                id: genId(),
                elType: 'column',
                settings: { _column_size: 50 },
                elements: [
                  {
                    id: genId(),
                    elType: 'widget',
                    widgetType: 'button',
                    settings: {
                      text: 'VER PROYECTOS',
                      link: { url: '#proyectos' },
                      button_text_color: '#0c0c0c',
                      background_color: COLORS.text,
                      typography_typography: 'custom',
                      typography_font_family: 'DM Sans',
                      typography_font_weight: '600',
                      typography_letter_spacing: { size: 2, unit: 'px' },
                      border_radius: { top: 0, right: 0, bottom: 0, left: 0, unit: 'px' },
                      button_padding: { top: 18, right: 36, bottom: 18, left: 36, unit: 'px' }
                    }
                  }
                ]
              },
              {
                id: genId(),
                elType: 'column',
                settings: { _column_size: 50 },
                elements: [
                  {
                    id: genId(),
                    elType: 'widget',
                    widgetType: 'button',
                    settings: {
                      text: 'CONTACTAR ESTUDIO',
                      link: { url: '#contacto' },
                      button_text_color: COLORS.text,
                      background_color: 'transparent',
                      border_border: 'solid',
                      border_width: { top: 1, right: 1, bottom: 1, left: 1, unit: 'px' },
                      border_color: COLORS.border,
                      typography_typography: 'custom',
                      typography_font_family: 'DM Sans',
                      typography_font_weight: '600',
                      typography_letter_spacing: { size: 2, unit: 'px' },
                      border_radius: { top: 0, right: 0, bottom: 0, left: 0, unit: 'px' },
                      button_padding: { top: 18, right: 36, bottom: 18, left: 36, unit: 'px' }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

// --- SECTION 2: PROYECTOS DESTACADOS ---
function buildProjectsSection() {
  const projectsData = [
    {
      id: '01',
      title: 'HOTEL OSH',
      location: 'Cartagena, Colombia',
      cat: 'Hotelero',
      desc: 'Diseño del control de iluminación, especificación y suministro de componentes integrando marcas de renombre: FLOS · LUTRON · MARSET · LODES ITALIA.',
      img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&fit=crop'
    },
    {
      id: '02',
      title: 'RESIDENCIA PRIVADA, ALTO DE LAS PALMAS',
      location: 'Medellín, Colombia',
      cat: 'Residencial',
      desc: 'Diseño integral de iluminación, escenas lumínicas inteligentes personalizadas y automatización de cortinas Lutron.',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&fit=crop'
    },
    {
      id: '03',
      title: 'RESIDENCIA PRIVADA, LA RESERVA',
      location: 'Rionegro, Antioquia',
      cat: 'Residencial',
      desc: 'Iluminación arquitectónica integrada al entorno campestre y materiales naturales.',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&fit=crop'
    },
    {
      id: '04',
      title: 'APARTAMENTO EN MIAMI',
      location: 'Miami, Florida, USA',
      cat: 'Residencial',
      desc: 'Proyecto internacional con altos estándares técnicos de diseño lumínico y domótica.',
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&fit=crop'
    }
  ];

  const columns = projectsData.map((p) => ({
    id: genId(),
    elType: 'column',
    settings: {
      _column_size: 50,
      _inline_size_tablet: 100,
      padding: { top: 20, right: 20, bottom: 40, left: 20, unit: 'px' }
    },
    elements: [
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'image',
        settings: {
          image: { url: p.img, id: '' },
          image_size: 'full',
          border_radius: { top: 4, right: 4, bottom: 4, left: 4, unit: 'px' },
          _margin: { bottom: 20, unit: 'px' }
        }
      },
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'heading',
        settings: {
          title: `${p.id} / ${p.cat.toUpperCase()} · ${p.location.toUpperCase()}`,
          header_size: 'p',
          title_color: COLORS.accent,
          typography_typography: 'custom',
          typography_font_family: 'DM Sans',
          typography_font_size: { size: 12, unit: 'px' },
          typography_letter_spacing: { size: 2, unit: 'px' },
          _margin: { bottom: 8, unit: 'px' }
        }
      },
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'heading',
        settings: {
          title: p.title,
          header_size: 'h3',
          title_color: COLORS.text,
          typography_typography: 'custom',
          typography_font_family: 'Playfair Display',
          typography_font_size: { size: 24, unit: 'px' },
          typography_font_weight: '600',
          _margin: { bottom: 12, unit: 'px' }
        }
      },
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'text-editor',
        settings: {
          editor: `<p>${p.desc}</p>`,
          text_color: COLORS.muted,
          typography_typography: 'custom',
          typography_font_family: 'DM Sans',
          typography_font_size: { size: 14, unit: 'px' },
          typography_line_height: { size: 1.7, unit: 'em' }
        }
      }
    ]
  }));

  return {
    id: genId(),
    elType: 'section',
    isInner: false,
    settings: {
      css_id: 'proyectos',
      background_background: 'classic',
      background_color: COLORS.bg,
      padding: { top: '100', right: '40', bottom: '100', left: '40', unit: 'px' }
    },
    elements: [
      {
        id: genId(),
        elType: 'column',
        settings: { _column_size: 100 },
        elements: [
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'heading',
            settings: {
              title: 'PROYECTOS SELECCIONADOS',
              header_size: 'h2',
              title_color: COLORS.text,
              typography_typography: 'custom',
              typography_font_family: 'Playfair Display',
              typography_font_size: { size: 48, unit: 'px' },
              typography_font_weight: '700',
              _margin: { bottom: 50, unit: 'px' }
            }
          },
          // 2x2 Inner section grid
          {
            id: genId(),
            elType: 'section',
            isInner: true,
            elements: [columns[0], columns[1]]
          },
          {
            id: genId(),
            elType: 'section',
            isInner: true,
            elements: [columns[2], columns[3]]
          }
        ]
      }
    ]
  };
}

// --- SECTION 3: SOBRE NOSOTROS ---
function buildAboutSection() {
  return {
    id: genId(),
    elType: 'section',
    isInner: false,
    settings: {
      css_id: 'nosotros',
      background_background: 'classic',
      background_color: COLORS.surface,
      padding: { top: '120', right: '40', bottom: '120', left: '40', unit: 'px' }
    },
    elements: [
      {
        id: genId(),
        elType: 'column',
        settings: { _column_size: 100 },
        elements: [
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'heading',
            settings: {
              title: 'SOBRE NOSOTROS',
              header_size: 'h2',
              title_color: COLORS.text,
              typography_typography: 'custom',
              typography_font_family: 'Playfair Display',
              typography_font_size: { size: 52, unit: 'px' },
              typography_font_weight: '700',
              _margin: { bottom: 30, unit: 'px' }
            }
          },
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'text-editor',
            settings: {
              editor: '<p style="font-size: 20px; line-height: 1.8;">Archtek Studio nació de la pasión por la tecnología, el diseño y la convicción de que la iluminación no es un detalle — es el lenguaje con el que un espacio habla. Con más de 10 años de experiencia desarrollando proyectos en Colombia y Estados Unidos, somos un estudio especializado en diseño de iluminación, sistemas de control de iluminación y tecnología audiovisual para proyectos de alta especificación.</p>',
              text_color: COLORS.text,
              typography_typography: 'custom',
              typography_font_family: 'DM Sans',
              _margin: { bottom: 60, unit: 'px' }
            }
          },
          // Stats Row
          {
            id: genId(),
            elType: 'section',
            isInner: true,
            elements: [
              {
                id: genId(),
                elType: 'column',
                settings: { _column_size: 33 },
                elements: [
                  {
                    id: genId(),
                    elType: 'widget',
                    widgetType: 'counter',
                    settings: {
                      starting_number: 0,
                      ending_number: 10,
                      prefix: '+',
                      title: 'Años de experiencia',
                      number_color: COLORS.accent,
                      title_color: COLORS.text,
                      typography_number_font_family: 'Playfair Display',
                      typography_title_font_family: 'DM Sans'
                    }
                  }
                ]
              },
              {
                id: genId(),
                elType: 'column',
                settings: { _column_size: 33 },
                elements: [
                  {
                    id: genId(),
                    elType: 'widget',
                    widgetType: 'counter',
                    settings: {
                      starting_number: 0,
                      ending_number: 200,
                      prefix: '+',
                      title: 'Proyectos ejecutados',
                      number_color: COLORS.accent,
                      title_color: COLORS.text,
                      typography_number_font_family: 'Playfair Display',
                      typography_title_font_family: 'DM Sans'
                    }
                  }
                ]
              },
              {
                id: genId(),
                elType: 'column',
                settings: { _column_size: 33 },
                elements: [
                  {
                    id: genId(),
                    elType: 'widget',
                    widgetType: 'heading',
                    settings: {
                      title: 'COLOMBIA · ESTADOS UNIDOS',
                      header_size: 'h4',
                      title_color: COLORS.accent,
                      typography_typography: 'custom',
                      typography_font_family: 'DM Sans',
                      typography_font_size: { size: 16, unit: 'px' },
                      typography_letter_spacing: { size: 2, unit: 'px' },
                      _margin: { top: 15, bottom: 5, unit: 'px' }
                    }
                  },
                  {
                    id: genId(),
                    elType: 'widget',
                    widgetType: 'text-editor',
                    settings: {
                      editor: '<p>Residencial · Comercial · Hotelero</p>',
                      text_color: COLORS.muted,
                      typography_typography: 'custom',
                      typography_font_family: 'DM Sans',
                      typography_font_size: { size: 14, unit: 'px' }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

// --- SECTION 4: ESPECIALIDADES ---
function buildSpecialtiesSection() {
  const specs = [
    { id: '01', title: 'Diseño de Iluminación', desc: 'Conceptos lumínicos que equilibran estética, confort y funcionalidad arquitectónica.' },
    { id: '02', title: 'Sistemas de Control y Automatización', desc: 'Tecnología para que iluminación, audio y video operen en perfecta armonía intuitiva.' },
    { id: '03', title: 'Suministro de Luminarias', desc: 'Especificación de marcas líderes a nivel mundial para garantizar acabados de lujo.' },
    { id: '04', title: 'Diseño de Control Lumínico', desc: 'Escenas personalizadas para adaptar el ambiente a cada momento de forma intuitiva.' },
    { id: '05', title: 'Sistemas de Audio', desc: 'Audio distribuido, ambiental comercial, surround de cine y audio exterior de intemperie.' },
    { id: '06', title: 'Acompañamiento en Obra', desc: 'Supervisión de cada detalle de instalación y puesta en marcha fiel al diseño original.' }
  ];

  const columns = specs.map(s => ({
    id: genId(),
    elType: 'column',
    settings: {
      _column_size: 33,
      _inline_size_tablet: 50,
      _inline_size_mobile: 100,
      background_background: 'classic',
      background_color: COLORS.surface,
      border_border: 'solid',
      border_width: { top: 1, right: 1, bottom: 1, left: 1, unit: 'px' },
      border_color: COLORS.border,
      padding: { top: 35, right: 30, bottom: 35, left: 30, unit: 'px' },
      _margin: { bottom: 25, unit: 'px' }
    },
    elements: [
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'heading',
        settings: {
          title: s.id,
          header_size: 'span',
          title_color: COLORS.accent,
          typography_typography: 'custom',
          typography_font_family: 'Playfair Display',
          typography_font_size: { size: 28, unit: 'px' },
          typography_font_weight: '700',
          _margin: { bottom: 15, unit: 'px' }
        }
      },
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'heading',
        settings: {
          title: s.title,
          header_size: 'h3',
          title_color: COLORS.text,
          typography_typography: 'custom',
          typography_font_family: 'Playfair Display',
          typography_font_size: { size: 20, unit: 'px' },
          typography_font_weight: '600',
          _margin: { bottom: 12, unit: 'px' }
        }
      },
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'text-editor',
        settings: {
          editor: `<p>${s.desc}</p>`,
          text_color: COLORS.muted,
          typography_typography: 'custom',
          typography_font_family: 'DM Sans',
          typography_font_size: { size: 14, unit: 'px' },
          typography_line_height: { size: 1.6, unit: 'em' }
        }
      }
    ]
  }));

  return {
    id: genId(),
    elType: 'section',
    isInner: false,
    settings: {
      css_id: 'especialidades',
      background_background: 'classic',
      background_color: COLORS.bg,
      padding: { top: '100', right: '40', bottom: '100', left: '40', unit: 'px' }
    },
    elements: [
      {
        id: genId(),
        elType: 'column',
        settings: { _column_size: 100 },
        elements: [
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'heading',
            settings: {
              title: 'NUESTRAS ESPECIALIDADES',
              header_size: 'h2',
              title_color: COLORS.text,
              typography_typography: 'custom',
              typography_font_family: 'Playfair Display',
              typography_font_size: { size: 48, unit: 'px' },
              typography_font_weight: '700',
              _margin: { bottom: 50, unit: 'px' }
            }
          },
          {
            id: genId(),
            elType: 'section',
            isInner: true,
            elements: [columns[0], columns[1], columns[2]]
          },
          {
            id: genId(),
            elType: 'section',
            isInner: true,
            elements: [columns[3], columns[4], columns[5]]
          }
        ]
      }
    ]
  };
}

// --- SECTION 5: PROCESO ---
function buildProcessSection() {
  const steps = [
    { num: '01', title: 'Consulta inicial', desc: 'Analizamos planos, materiales, tiempos y la visión que deseas proyectar.' },
    { num: '02', title: 'Concepto lumínico', desc: 'Desarrollamos el diseño interpretando arquitectura y experiencia.' },
    { num: '03', title: 'Cotización y Especificación', desc: 'Presupuesto y selección de luminarias exactas para el proyecto.' },
    { num: '04', title: 'Suministro y coordinación', desc: 'Importación y logística sincronizada con la obra.' },
    { num: '05', title: 'Instalación y puesta en marcha', desc: 'Supervisión en obra y programación de escenas lumínicas.' }
  ];

  const columns = steps.map(s => ({
    id: genId(),
    elType: 'column',
    settings: {
      _column_size: 20,
      _inline_size_tablet: 50,
      _inline_size_mobile: 100,
      padding: { top: 20, right: 15, bottom: 20, left: 15, unit: 'px' }
    },
    elements: [
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'heading',
        settings: {
          title: s.num,
          header_size: 'span',
          title_color: COLORS.accent,
          typography_typography: 'custom',
          typography_font_family: 'Playfair Display',
          typography_font_size: { size: 40, unit: 'px' },
          typography_font_weight: '700',
          _margin: { bottom: 10, unit: 'px' }
        }
      },
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'heading',
        settings: {
          title: s.title,
          header_size: 'h4',
          title_color: COLORS.text,
          typography_typography: 'custom',
          typography_font_family: 'Playfair Display',
          typography_font_size: { size: 18, unit: 'px' },
          typography_font_weight: '600',
          _margin: { bottom: 10, unit: 'px' }
        }
      },
      {
        id: genId(),
        elType: 'widget',
        widgetType: 'text-editor',
        settings: {
          editor: `<p>${s.desc}</p>`,
          text_color: COLORS.muted,
          typography_typography: 'custom',
          typography_font_family: 'DM Sans',
          typography_font_size: { size: 13, unit: 'px' },
          typography_line_height: { size: 1.5, unit: 'em' }
        }
      }
    ]
  }));

  return {
    id: genId(),
    elType: 'section',
    isInner: false,
    settings: {
      css_id: 'proceso',
      background_background: 'classic',
      background_color: COLORS.surface,
      padding: { top: '100', right: '40', bottom: '100', left: '40', unit: 'px' }
    },
    elements: [
      {
        id: genId(),
        elType: 'column',
        settings: { _column_size: 100 },
        elements: [
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'heading',
            settings: {
              title: 'NUESTRO PROCESO',
              header_size: 'h2',
              title_color: COLORS.text,
              typography_typography: 'custom',
              typography_font_family: 'Playfair Display',
              typography_font_size: { size: 48, unit: 'px' },
              typography_font_weight: '700',
              _margin: { bottom: 50, unit: 'px' }
            }
          },
          {
            id: genId(),
            elType: 'section',
            isInner: true,
            elements: columns
          }
        ]
      }
    ]
  };
}

// --- SECTION 6: ALIADOS / BRANDS ---
function buildBrandsSection() {
  return {
    id: genId(),
    elType: 'section',
    isInner: false,
    settings: {
      background_background: 'classic',
      background_color: COLORS.bg,
      padding: { top: '80', right: '40', bottom: '80', left: '40', unit: 'px' }
    },
    elements: [
      {
        id: genId(),
        elType: 'column',
        settings: { _column_size: 100 },
        elements: [
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'heading',
            settings: {
              title: 'MARCAS ALIADAS',
              header_size: 'h3',
              align: 'center',
              title_color: COLORS.accent,
              typography_typography: 'custom',
              typography_font_family: 'DM Sans',
              typography_font_size: { size: 14, unit: 'px' },
              typography_letter_spacing: { size: 4, unit: 'px' },
              _margin: { bottom: 25, unit: 'px' }
            }
          },
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'heading',
            settings: {
              title: 'FLOS · LUTRON · MARSET · LODES ITALIA · HOFFLIGHTS',
              header_size: 'p',
              align: 'center',
              title_color: COLORS.muted,
              typography_typography: 'custom',
              typography_font_family: 'Playfair Display',
              typography_font_size: { size: 24, unit: 'px' },
              typography_letter_spacing: { size: 2, unit: 'px' },
              typography_font_weight: '600'
            }
          }
        ]
      }
    ]
  };
}

// --- SECTION 7: CONTACTO ---
function buildContactSection() {
  return {
    id: genId(),
    elType: 'section',
    isInner: false,
    settings: {
      css_id: 'contacto',
      background_background: 'classic',
      background_color: COLORS.surface,
      padding: { top: '120', right: '40', bottom: '120', left: '40', unit: 'px' }
    },
    elements: [
      {
        id: genId(),
        elType: 'column',
        settings: {
          _column_size: 100,
          align: 'center'
        },
        elements: [
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'heading',
            settings: {
              title: 'HABLEMOS DE TU PROYECTO',
              header_size: 'h2',
              align: 'center',
              title_color: COLORS.text,
              typography_typography: 'custom',
              typography_font_family: 'Playfair Display',
              typography_font_size: { size: 56, unit: 'px' },
              typography_font_weight: '700',
              _margin: { bottom: 20, unit: 'px' }
            }
          },
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'text-editor',
            settings: {
              editor: '<p style="text-align: center;">¿Tienes un proyecto en desarrollo? Integramos diseño, control y luminarias de alta gama.</p>',
              text_color: COLORS.muted,
              typography_typography: 'custom',
              typography_font_family: 'DM Sans',
              typography_font_size: { size: 18, unit: 'px' },
              _margin: { bottom: 40, unit: 'px' }
            }
          },
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'button',
            settings: {
              text: 'contacto@archtekstudio.com',
              link: { url: 'mailto:contacto@archtekstudio.com' },
              align: 'center',
              button_text_color: '#0c0c0c',
              background_color: COLORS.accent,
              typography_typography: 'custom',
              typography_font_family: 'DM Sans',
              typography_font_weight: '600',
              typography_font_size: { size: 16, unit: 'px' },
              typography_letter_spacing: { size: 2, unit: 'px' },
              border_radius: { top: 0, right: 0, bottom: 0, left: 0, unit: 'px' },
              button_padding: { top: 20, right: 45, bottom: 20, left: 45, unit: 'px' },
              _margin: { bottom: 50, unit: 'px' }
            }
          },
          {
            id: genId(),
            elType: 'widget',
            widgetType: 'text-editor',
            settings: {
              editor: '<p style="text-align: center; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Medellín · Cartagena · Miami</p>',
              text_color: COLORS.subtle,
              typography_typography: 'custom',
              typography_font_family: 'DM Sans'
            }
          }
        ]
      }
    ]
  };
}

// Generate the templates
function main() {
  const outputDir = path.join(process.cwd(), 'elementor-templates');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Individual Sections
  const sections = [
    { filename: '01-hero-archtek.json', title: 'Archtek - 01 Hero Section', fn: buildHeroSection },
    { filename: '02-proyectos-archtek.json', title: 'Archtek - 02 Proyectos Destacados', fn: buildProjectsSection },
    { filename: '03-sobre-nosotros-archtek.json', title: 'Archtek - 03 Sobre Nosotros', fn: buildAboutSection },
    { filename: '04-especialidades-archtek.json', title: 'Archtek - 04 Especialidades', fn: buildSpecialtiesSection },
    { filename: '05-proceso-archtek.json', title: 'Archtek - 05 Proceso', fn: buildProcessSection },
    { filename: '06-marcas-archtek.json', title: 'Archtek - 06 Marcas Aliadas', fn: buildBrandsSection },
    { filename: '07-contacto-archtek.json', title: 'Archtek - 07 Contacto', fn: buildContactSection }
  ];

  for (const s of sections) {
    const template = {
      version: '0.4',
      title: s.title,
      type: 'section',
      content: [s.fn()]
    };
    fs.writeFileSync(path.join(outputDir, s.filename), JSON.stringify(template, null, 2), 'utf-8');
    console.log(`Saved: ${s.filename}`);
  }

  // 2. Full Page Template (Includes all sections)
  const fullPageTemplate = {
    version: '0.4',
    title: 'Archtek Studio - Home Completa (Editable)',
    type: 'page',
    content: [
      buildHeroSection(),
      buildProjectsSection(),
      buildAboutSection(),
      buildSpecialtiesSection(),
      buildProcessSection(),
      buildBrandsSection(),
      buildContactSection()
    ]
  };

  const fullPagePath = path.join(outputDir, 'archtek-home-completa.json');
  fs.writeFileSync(fullPagePath, JSON.stringify(fullPageTemplate, null, 2), 'utf-8');
  console.log(`Saved Full Page: archtek-home-completa.json`);

  console.log('\nAll Elementor templates generated successfully in ./elementor-templates/');
}

main();
