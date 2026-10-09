// ─── Proyectos data ────────────────────────────────────────────────────────────
// Cover image = first browser-compatible file (.jpg / .jpeg / .webp) per folder.
// HEIC files are excluded — not supported in browsers.

export interface Proyecto {
  id: string
  name: string
  location: string
  cover: string
  images: string[]
  category: { es: string; en: string }
}

export const proyectos: Proyecto[] = [
  {
    id: 'casa-anam',
    name: 'CASA ANAM',
    location: 'San Andrés, Colombia',
    category: { es: 'Residencial · Iluminación', en: 'Residential · Lighting' },
    cover: new URL('../PROYECTOS/CASA ANAM - SAN ANDRES, COLOMBIA/DSC01090.webp', import.meta.url).href,
    images: [
      new URL('../PROYECTOS/CASA ANAM - SAN ANDRES, COLOMBIA/DSC01090.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA ANAM - SAN ANDRES, COLOMBIA/DSC01096.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA ANAM - SAN ANDRES, COLOMBIA/DSC01098.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA ANAM - SAN ANDRES, COLOMBIA/DSC01100.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA ANAM - SAN ANDRES, COLOMBIA/DSC01102.webp', import.meta.url).href,
    ],
  },
  {
    id: 'loft-nj',
    name: 'LOFT NJ',
    location: 'New Jersey, USA',
    category: { es: 'Residencial · Domótica', en: 'Residential · Home Automation' },
    cover: new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01219.webp', import.meta.url).href,
    images: [
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01196.webp', import.meta.url).href,
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01205.webp', import.meta.url).href,
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01209.webp', import.meta.url).href,
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01210.webp', import.meta.url).href,
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01217.webp', import.meta.url).href,
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01219.webp', import.meta.url).href,
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01221.webp', import.meta.url).href,
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01222.webp', import.meta.url).href,
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01226.webp', import.meta.url).href,
      new URL('../PROYECTOS/LOFT NJ - NEW JERSEY, USA/DSC01232.webp', import.meta.url).href,
    ],
  },
  {
    id: 'quadro-500',
    name: 'QUADRO 500',
    location: 'Miami, Florida, USA',
    category: { es: 'Residencial · Iluminación · Audio', en: 'Residential · Lighting · Audio' },
    cover: new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01312.webp', import.meta.url).href,
    images: [
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01312.webp', import.meta.url).href,
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01319.webp', import.meta.url).href,
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01325.webp', import.meta.url).href,
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01331.webp', import.meta.url).href,
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01342.webp', import.meta.url).href,
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01357.webp', import.meta.url).href,
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01360.webp', import.meta.url).href,
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01366.webp', import.meta.url).href,
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01368.webp', import.meta.url).href,
      new URL('../PROYECTOS/QUADRO 500 - MIAMI, FLORIDA, USA/DSC01373.webp', import.meta.url).href,
    ],
  },
  {
    id: 'private-residence-fr',
    name: 'PRIVATE RESIDENCE FR',
    location: 'Orlando, Florida, USA',
    category: { es: 'Residencial · Control', en: 'Residential · Control' },
    cover: new URL('../PROYECTOS/PRIVATE RESIDENCE, FR - ORLANDO, FLORIDA, USA/DSC01483.webp', import.meta.url).href,
    images: [
      new URL('../PROYECTOS/PRIVATE RESIDENCE, FR - ORLANDO, FLORIDA, USA/DSC01483.webp', import.meta.url).href,
      new URL('../PROYECTOS/PRIVATE RESIDENCE, FR - ORLANDO, FLORIDA, USA/DSC01484.webp', import.meta.url).href,
      new URL('../PROYECTOS/PRIVATE RESIDENCE, FR - ORLANDO, FLORIDA, USA/DSC01491.webp', import.meta.url).href,
      new URL('../PROYECTOS/PRIVATE RESIDENCE, FR - ORLANDO, FLORIDA, USA/DSC01501.webp', import.meta.url).href,
      new URL('../PROYECTOS/PRIVATE RESIDENCE, FR - ORLANDO, FLORIDA, USA/DSC01541.webp', import.meta.url).href,
      new URL('../PROYECTOS/PRIVATE RESIDENCE, FR - ORLANDO, FLORIDA, USA/DSC01547.webp', import.meta.url).href,
      new URL('../PROYECTOS/PRIVATE RESIDENCE, FR - ORLANDO, FLORIDA, USA/DSC01560.webp', import.meta.url).href,
      new URL('../PROYECTOS/PRIVATE RESIDENCE, FR - ORLANDO, FLORIDA, USA/DSC01576.webp', import.meta.url).href,
    ],
  },
  {
    id: 'verdi',
    name: 'VERDI',
    location: 'Rionegro, Colombia',
    category: { es: 'Residencial · Iluminación', en: 'Residential · Lighting' },
    cover: new URL('../PROYECTOS/VERDI - RIONEGRO/DSC00423.webp', import.meta.url).href,
    images: [
      new URL('../PROYECTOS/VERDI - RIONEGRO/DSC00423.webp', import.meta.url).href,
      new URL('../PROYECTOS/VERDI - RIONEGRO/DSC00433.webp', import.meta.url).href,
      new URL('../PROYECTOS/VERDI - RIONEGRO/DSC00462.webp', import.meta.url).href,
      new URL('../PROYECTOS/VERDI - RIONEGRO/DSC01464.webp', import.meta.url).href,
    ],
  },
  {
    id: 'casa-la-reserva',
    name: 'CASA LA RESERVA',
    location: 'Rionegro, Colombia',
    category: { es: 'Residencial · Iluminación · Audio', en: 'Residential · Lighting · Audio' },
    cover: new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/0930702D-7C2B-4A71-AC16-2688EDBED3DA.webp', import.meta.url).href,
    images: [
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/0930702D-7C2B-4A71-AC16-2688EDBED3DA.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/19FE0B7A-CBE0-4040-B0CD-D4052BB43A56.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/20E37520-BB7C-4734-8A0F-8BEC06B51732.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/35D59CCE-2567-41C5-B863-089336AB78D4.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/44806437-6C2A-41B4-AF3F-D35CA49DEF38.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/54FBA4EA-2E77-43AB-9EF0-0BC5924984D0.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/5F03D319-39B5-4FA1-89CD-9ECAC365D168.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/7600AC3A-FBD6-45B1-9CC7-BFE8B7D410B7.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/79F55B86-80D4-4FBA-B439-DAC5E328A71B.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/9A6E91D9-0B48-4649-AC96-B1F33E61E33B.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/A7C3C2E7-EC48-4C97-AE43-2ADA7493349E.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/BAF836C6-EAA3-44D6-A35E-A1F91643261B.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/BE0B9065-FA5D-4E26-B89E-397C7D2D7968.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/C7054A26-7A94-4D70-80DB-2504E14290B1.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/D2A9D3E3-9707-4FF4-863E-F36A0D093436.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/E22FCB9F-521B-44C3-97EB-271AF161482F.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/E38CD0AD-1687-4687-AAF3-B2C147884218.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/EBAFA96E-104E-4158-A321-1BB36BC0E324.webp', import.meta.url).href,
      new URL('../PROYECTOS/CASA LA RESERVA - RIONEGRO, COLOMBIA/F8164A54-0587-41BD-A7DB-F3764480E9D1.webp', import.meta.url).href,
    ],
  },
  {
    id: 'hotel-osh',
    name: 'HOTEL OSH',
    location: 'Cartagena, Colombia',
    category: { es: 'Hotelería · Iluminación · Audio', en: 'Hospitality · Lighting · Audio' },
    // Hotel Osh only has HEIC files — use a placeholder note; cover shown as first HEIC (Safari supports HEIC)
    cover: new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/0E899B22-28C4-4AE8-A888-26A24A9F4E39.webp', import.meta.url).href,
    images: [
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/0E899B22-28C4-4AE8-A888-26A24A9F4E39.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/3B9AD3A8-25A1-486E-9842-7F057A7567AC.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/5EF0B3FC-B20C-4386-9D2D-8BA2E9FF3F36.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/8896D264-7E37-45D5-A1F3-F72CF72A8EF5.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/A6416176-355E-4AE0-A8B2-62D7AB6CA943.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/AAFA4564-09B6-4AE5-8D2D-7D0B9F8FC8B9.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/AB8D6BA2-0D5C-49E4-AD86-2017E26EEB63.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/C62CC8F5-688B-426F-B919-A65334353E38.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/D2435DE7-B53F-4C49-B242-030C2CAEAA27.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/D8B9C72F-F571-4253-82C8-6AC0FA7DD09D.webp', import.meta.url).href,
      new URL('../PROYECTOS/HOTEL OSH - CARTAGENA, COLOMBIA/E092AE6F-392F-4E3D-B57D-5FFCE27BA819.webp', import.meta.url).href,
    ],
  },
  {
    id: 'casa-j10',
    name: 'CASA J10',
    location: 'Rionegro, Colombia',
    category: { es: 'Residencial · Domótica', en: 'Residential · Smart Home' },
    cover: new URL('../PROYECTOS/CASA J10 - RIONEGRO, COLOMBIA/7EF65631-C245-49EC-8B03-693BD0C6CE79.webp', import.meta.url).href,
    images: [
      new URL('../PROYECTOS/CASA J10 - RIONEGRO, COLOMBIA/7EF65631-C245-49EC-8B03-693BD0C6CE79.webp', import.meta.url).href,
    ],
  },
  {
    id: 'spiga',
    name: 'SPIGA',
    location: 'Medellín, Colombia',
    category: { es: 'Comercial · Iluminación', en: 'Commercial · Lighting' },
    cover: new URL('../PROYECTOS/SPIGA - MEDELLIN, COLOMBIA/83CB3DBA-7002-4225-A3DC-CDD9CA6A6E01.webp', import.meta.url).href,
    images: [
      new URL('../PROYECTOS/SPIGA - MEDELLIN, COLOMBIA/83CB3DBA-7002-4225-A3DC-CDD9CA6A6E01.webp', import.meta.url).href,
      new URL('../PROYECTOS/SPIGA - MEDELLIN, COLOMBIA/AC06901A-CBB5-47EE-80E5-DF501A11F65D.webp', import.meta.url).href,
    ],
  },
  {
    id: 'calera-alta',
    name: 'CALERA ALTA',
    location: 'Medellín, Colombia',
    category: { es: 'Residencial · Iluminación', en: 'Residential · Lighting' },
    // Calera Alta only has HEIC — no browser-compatible images
    cover: '',
    images: [],
  },
]

// Only projects with a valid cover image
export const proyectosConCover = proyectos.filter(p => p.cover !== '')
