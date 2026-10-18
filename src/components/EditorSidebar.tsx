import React, { useState, useEffect, useRef } from 'react'
import { useEdit, type EditableProject, type EditableSpecialty, type EditableStep, type EditableValue, type EditableStat, type EditableBrandLogo } from '../context/EditContext'

// ---- Reusable field components ----
const Field = ({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        style={inputStyle}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    )}
  </div>
)

const ImageField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
          placeholder="URL o sube un archivo..."
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '6px 10px',
            backgroundColor: '#2e3328',
            border: '1px solid #4A5240',
            borderRadius: 4,
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          title="Subir archivo desde tu computadora"
        >
          Subir
        </button>
      </div>
      {value && (
        <div style={{ position: 'relative', marginTop: 4 }}>
          <img
            src={value}
            alt="preview"
            style={{
              width: '100%',
              height: 60,
              objectFit: 'contain',
              backgroundColor: '#111',
              borderRadius: 4,
              border: '1px solid #333',
              padding: 4,
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid #555',
              borderRadius: '50%',
              color: '#fff',
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              cursor: 'pointer',
            }}
            title="Quitar imagen"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  backgroundColor: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: 4,
  color: '#fff',
  fontSize: 13,
  fontFamily: 'inherit',
  outline: 'none',
  resize: 'vertical',
}

// ---- Collapsible Section ----
const Section = ({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen || false)
  return (
    <div style={{ borderBottom: '1px solid #222', marginBottom: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#fff',
          fontFamily: 'inherit',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        {title}
        <span style={{ fontSize: 18, transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
      </button>
      {open && (
        <div style={{ padding: '0 16px 16px' }}>
          {children}
        </div>
      )}
    </div>
  )
}

declare global {
  interface Window {
    ARCHTEK_CAN_EDIT?: boolean
  }
}

// ---- Main Sidebar ----
export function EditorSidebar() {
  const { content, updateContent, resetContent, isEditing, setIsEditing, exportJSON } = useEdit()

  // Determine whether edit mode is authorized / active
  const [canEdit, setCanEdit] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false

    // 1. WordPress admin logged in
    if (window.ARCHTEK_CAN_EDIT === true) return true

    // 2. URL parameter: ?edit, ?edit=true, ?mode=edit, or hash #edit
    const params = new URLSearchParams(window.location.search)
    if (params.has('edit') || params.get('mode') === 'edit' || window.location.hash === '#edit') {
      return true
    }

    // 3. Saved admin session in sessionStorage
    if (sessionStorage.getItem('archtek_edit_mode') === 'true') {
      return true
    }

    // 4. Local Vite development server
    if (import.meta.env.DEV) {
      return true
    }

    return false
  })

  // Keyboard shortcut listener: Ctrl + Shift + E (or Cmd + Shift + E on Mac)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault()
        setCanEdit((prev) => {
          const next = !prev
          if (next) {
            sessionStorage.setItem('archtek_edit_mode', 'true')
            setIsEditing(true)
          } else {
            sessionStorage.removeItem('archtek_edit_mode')
            setIsEditing(false)
          }
          return next
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsEditing])

  // Automatically open sidebar if ?edit or #edit is present in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.has('edit') || params.get('mode') === 'edit' || window.location.hash === '#edit') {
        setIsEditing(true)
      }
    }
  }, [setIsEditing])

  // Exit edit mode completely (hides pencil button and removes URL params)
  const handleExitEditMode = () => {
    setIsEditing(false)
    sessionStorage.removeItem('archtek_edit_mode')
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.delete('edit')
      url.searchParams.delete('mode')
      if (url.hash === '#edit') url.hash = ''
      window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''))
    }
    if (!import.meta.env.DEV && !window.ARCHTEK_CAN_EDIT) {
      setCanEdit(false)
    }
  }

  const handleExport = () => {
    const json = exportJSON()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'site-content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  // In production, regular visitors will see NOTHING (zero pencil button)
  if (!canEdit) {
    return null
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        data-cursor="link"
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 10000,
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: '#4A5240',
          border: '2px solid rgba(255,255,255,0.15)',
          color: '#fff',
          fontSize: 20,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 30px rgba(74,82,64,0.5)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)' }}
        title="Modo Edición activo (Ctrl+Shift+E para ocultar)"
      >
        ✏️
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 360,
        height: '100vh',
        backgroundColor: '#0d0d0d',
        borderRight: '1px solid #222',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Jost', sans-serif",
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Editor</span>
          <span style={{ fontSize: 10, color: '#666', display: 'block', marginTop: 2 }}>Editar contenido del sitio</span>
        </div>
        <button
          onClick={() => setIsEditing(false)}
          style={{ background: 'none', border: 'none', color: '#888', fontSize: 22, cursor: 'pointer', padding: 4 }}
        >
          ✕
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* HERO */}
        <Section title="🏠 Hero">
          <Field label="Tagline (ES)" value={content.hero.taglineEs} multiline onChange={(v) => updateContent((p) => ({ ...p, hero: { ...p.hero, taglineEs: v } }))} />
          <Field label="Tagline (EN)" value={content.hero.taglineEn} multiline onChange={(v) => updateContent((p) => ({ ...p, hero: { ...p.hero, taglineEn: v } }))} />
          <Field label="Subtítulo (ES)" value={content.hero.subEs} multiline onChange={(v) => updateContent((p) => ({ ...p, hero: { ...p.hero, subEs: v } }))} />
          <Field label="Subtítulo (EN)" value={content.hero.subEn} multiline onChange={(v) => updateContent((p) => ({ ...p, hero: { ...p.hero, subEn: v } }))} />
          <ImageField label="Imagen Fondo (Oscuro)" value={content.hero.bgUrlDark} onChange={(v) => updateContent((p) => ({ ...p, hero: { ...p.hero, bgUrlDark: v } }))} />
          <ImageField label="Imagen Fondo (Claro)" value={content.hero.bgUrlLight} onChange={(v) => updateContent((p) => ({ ...p, hero: { ...p.hero, bgUrlLight: v } }))} />
          <Field label="Scroll text (ES)" value={content.hero.scrollTextEs} onChange={(v) => updateContent((p) => ({ ...p, hero: { ...p.hero, scrollTextEs: v } }))} />
          <Field label="Scroll text (EN)" value={content.hero.scrollTextEn} onChange={(v) => updateContent((p) => ({ ...p, hero: { ...p.hero, scrollTextEn: v } }))} />
        </Section>

        {/* PROJECTS */}
        <Section title="📸 Proyectos">
          {content.projects.map((project, idx) => (
            <div key={project.id} style={{ padding: '12px 0', borderBottom: idx < content.projects.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4A5240', marginBottom: 8 }}>Proyecto {project.id}</div>
              <Field label="Título" value={project.title} onChange={(v) => updateContent((p) => {
                const projects = [...p.projects]; projects[idx] = { ...projects[idx], title: v }; return { ...p, projects }
              })} />
              <Field label="Ubicación" value={project.location} onChange={(v) => updateContent((p) => {
                const projects = [...p.projects]; projects[idx] = { ...projects[idx], location: v }; return { ...p, projects }
              })} />
              <Field label="Categoría (ES)" value={project.category.es} onChange={(v) => updateContent((p) => {
                const projects = [...p.projects]; projects[idx] = { ...projects[idx], category: { ...projects[idx].category, es: v } }; return { ...p, projects }
              })} />
              <Field label="Categoría (EN)" value={project.category.en} onChange={(v) => updateContent((p) => {
                const projects = [...p.projects]; projects[idx] = { ...projects[idx], category: { ...projects[idx].category, en: v } }; return { ...p, projects }
              })} />
              <Field label="Descripción (ES)" value={project.description.es} multiline onChange={(v) => updateContent((p) => {
                const projects = [...p.projects]; projects[idx] = { ...projects[idx], description: { ...projects[idx].description, es: v } }; return { ...p, projects }
              })} />
              <Field label="Descripción (EN)" value={project.description.en} multiline onChange={(v) => updateContent((p) => {
                const projects = [...p.projects]; projects[idx] = { ...projects[idx], description: { ...projects[idx].description, en: v } }; return { ...p, projects }
              })} />
              <ImageField label="Imagen" value={project.image} onChange={(v) => updateContent((p) => {
                const projects = [...p.projects]; projects[idx] = { ...projects[idx], image: v }; return { ...p, projects }
              })} />
            </div>
          ))}
        </Section>

        {/* GALLERY PAGE */}
        <Section title="🖼️ Galería de Obras">
          <Field label="Badge Superior (ES)" value={content.gallery?.badgeEs || ''} onChange={(v) => updateContent((p) => ({ ...p, gallery: { ...p.gallery, badgeEs: v } }))} />
          <Field label="Badge Superior (EN)" value={content.gallery?.badgeEn || ''} onChange={(v) => updateContent((p) => ({ ...p, gallery: { ...p.gallery, badgeEn: v } }))} />
          <Field label="Botón Volver (ES)" value={content.gallery?.backHomeTextEs || ''} onChange={(v) => updateContent((p) => ({ ...p, gallery: { ...p.gallery, backHomeTextEs: v } }))} />
          <Field label="Botón Volver (EN)" value={content.gallery?.backHomeTextEn || ''} onChange={(v) => updateContent((p) => ({ ...p, gallery: { ...p.gallery, backHomeTextEn: v } }))} />
          <Field label="Subtítulo Catálogo (ES)" value={content.gallery?.catalogueTitleEs || ''} onChange={(v) => updateContent((p) => ({ ...p, gallery: { ...p.gallery, catalogueTitleEs: v } }))} />
          <Field label="Subtítulo Catálogo (EN)" value={content.gallery?.catalogueTitleEn || ''} onChange={(v) => updateContent((p) => ({ ...p, gallery: { ...p.gallery, catalogueTitleEn: v } }))} />
          <Field label="Título Catálogo (ES)" value={content.gallery?.allProjectsTitleEs || ''} onChange={(v) => updateContent((p) => ({ ...p, gallery: { ...p.gallery, allProjectsTitleEs: v } }))} />
          <Field label="Título Catálogo (EN)" value={content.gallery?.allProjectsTitleEn || ''} onChange={(v) => updateContent((p) => ({ ...p, gallery: { ...p.gallery, allProjectsTitleEn: v } }))} />

          <div style={{ fontSize: 11, fontWeight: 700, color: '#4A5240', marginTop: 16, marginBottom: 8, textTransform: 'uppercase' }}>Proyectos de la Galería</div>
          {(content.gallery?.projects || []).map((proj, idx) => (
            <div key={proj.id || idx} style={{ padding: '12px 0', borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 6 }}>{proj.name || `Proyecto #${idx + 1}`}</div>
              <Field label="Nombre del Proyecto" value={proj.name} onChange={(v) => updateContent((p) => {
                const projects = [...(p.gallery?.projects || [])]
                projects[idx] = { ...projects[idx], name: v }
                return { ...p, gallery: { ...p.gallery, projects } }
              })} />
              <Field label="Ubicación" value={proj.location} onChange={(v) => updateContent((p) => {
                const projects = [...(p.gallery?.projects || [])]
                projects[idx] = { ...projects[idx], location: v }
                return { ...p, gallery: { ...p.gallery, projects } }
              })} />
              <Field label="Categoría (ES)" value={proj.category.es} onChange={(v) => updateContent((p) => {
                const projects = [...(p.gallery?.projects || [])]
                projects[idx] = { ...projects[idx], category: { ...projects[idx].category, es: v } }
                return { ...p, gallery: { ...p.gallery, projects } }
              })} />
              <Field label="Categoría (EN)" value={proj.category.en} onChange={(v) => updateContent((p) => {
                const projects = [...(p.gallery?.projects || [])]
                projects[idx] = { ...projects[idx], category: { ...projects[idx].category, en: v } }
                return { ...p, gallery: { ...p.gallery, projects } }
              })} />
              <ImageField label="Imagen Portada" value={proj.cover} onChange={(v) => updateContent((p) => {
                const projects = [...(p.gallery?.projects || [])]
                projects[idx] = { ...projects[idx], cover: v }
                return { ...p, gallery: { ...p.gallery, projects } }
              })} />
              
              {/* Multiple Images Manager for the Lightbox/Gallery */}
              <div style={{ marginTop: 16, backgroundColor: '#161616', padding: 10, borderRadius: 6, border: '1px solid #282828' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#aaa', textTransform: 'uppercase' }}>
                    Imágenes Extra ({(proj.images || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={() => updateContent((p) => {
                      const projects = [...(p.gallery?.projects || [])]
                      projects[idx] = { ...projects[idx], images: [...(projects[idx].images || []), ''] }
                      return { ...p, gallery: { ...p.gallery, projects } }
                    })}
                    style={{
                      padding: '4px 8px', backgroundColor: '#4A5240', border: 'none', borderRadius: 4, color: '#fff', fontSize: 10, cursor: 'pointer', fontWeight: 600
                    }}
                  >
                    + Añadir Imagen
                  </button>
                </div>
                {(proj.images || []).map((imgUrl, imgIdx) => (
                  <div key={imgIdx} style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <ImageField 
                        label={`Imagen #${imgIdx + 1}`} 
                        value={imgUrl} 
                        onChange={(v) => updateContent((p) => {
                          const projects = [...(p.gallery?.projects || [])]
                          const newImages = [...(projects[idx].images || [])]
                          newImages[imgIdx] = v
                          projects[idx] = { ...projects[idx], images: newImages }
                          return { ...p, gallery: { ...p.gallery, projects } }
                        })} 
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => updateContent((p) => {
                        const projects = [...(p.gallery?.projects || [])]
                        const newImages = [...(projects[idx].images || [])]
                        newImages.splice(imgIdx, 1)
                        projects[idx] = { ...projects[idx], images: newImages }
                        return { ...p, gallery: { ...p.gallery, projects } }
                      })}
                      style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: 14, marginTop: 28, padding: '4px' }}
                      title="Eliminar esta imagen"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* ABOUT */}
        <Section title="📝 Sobre Nosotros">
          <Field label="Título (ES)" value={content.about.titleEs} onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, titleEs: v } }))} />
          <Field label="Título (EN)" value={content.about.titleEn} onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, titleEn: v } }))} />
          <Field label="Manifiesto (ES)" value={content.about.manifestoEs} multiline onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, manifestoEs: v } }))} />
          <Field label="Manifiesto (EN)" value={content.about.manifestoEn} multiline onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, manifestoEn: v } }))} />
          <Field label="Cuerpo (ES)" value={content.about.bodyEs} multiline onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, bodyEs: v } }))} />
          <Field label="Cuerpo (EN)" value={content.about.bodyEn} multiline onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, bodyEn: v } }))} />
          <div style={{ fontSize: 11, fontWeight: 700, color: '#666', marginTop: 12, marginBottom: 8, textTransform: 'uppercase' }}>Estadísticas</div>
          {content.about.stats.map((stat, idx) => (
            <div key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
              <Field label="Valor" value={stat.value} onChange={(v) => updateContent((p) => {
                const stats = [...p.about.stats]; stats[idx] = { ...stats[idx], value: v }; return { ...p, about: { ...p.about, stats } }
              })} />
              <Field label="Label (ES)" value={stat.labelEs} onChange={(v) => updateContent((p) => {
                const stats = [...p.about.stats]; stats[idx] = { ...stats[idx], labelEs: v }; return { ...p, about: { ...p.about, stats } }
              })} />
              <Field label="Label (EN)" value={stat.labelEn} onChange={(v) => updateContent((p) => {
                const stats = [...p.about.stats]; stats[idx] = { ...stats[idx], labelEn: v }; return { ...p, about: { ...p.about, stats } }
              })} />
            </div>
          ))}
          <Field label="Países (ES)" value={content.about.countriesEs} onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, countriesEs: v } }))} />
          <Field label="Países (EN)" value={content.about.countriesEn} onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, countriesEn: v } }))} />
          <Field label="Sectores (ES)" value={content.about.sectorsEs} onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, sectorsEs: v } }))} />
          <Field label="Sectores (EN)" value={content.about.sectorsEn} onChange={(v) => updateContent((p) => ({ ...p, about: { ...p.about, sectorsEn: v } }))} />
          <div style={{ fontSize: 11, fontWeight: 700, color: '#666', marginTop: 12, marginBottom: 8, textTransform: 'uppercase' }}>Valores</div>
          {content.about.values.map((val, idx) => (
            <div key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
              <Field label="Título (ES)" value={val.titleEs} onChange={(v) => updateContent((p) => {
                const values = [...p.about.values]; values[idx] = { ...values[idx], titleEs: v }; return { ...p, about: { ...p.about, values } }
              })} />
              <Field label="Título (EN)" value={val.titleEn} onChange={(v) => updateContent((p) => {
                const values = [...p.about.values]; values[idx] = { ...values[idx], titleEn: v }; return { ...p, about: { ...p.about, values } }
              })} />
              <Field label="Desc (ES)" value={val.descEs} onChange={(v) => updateContent((p) => {
                const values = [...p.about.values]; values[idx] = { ...values[idx], descEs: v }; return { ...p, about: { ...p.about, values } }
              })} />
              <Field label="Desc (EN)" value={val.descEn} onChange={(v) => updateContent((p) => {
                const values = [...p.about.values]; values[idx] = { ...values[idx], descEn: v }; return { ...p, about: { ...p.about, values } }
              })} />
            </div>
          ))}
        </Section>

        {/* SPECIALTIES */}
        <Section title="⚡ Especialidades">
          <Field label="Título (ES)" value={content.specialties.titleEs} onChange={(v) => updateContent((p) => ({ ...p, specialties: { ...p.specialties, titleEs: v } }))} />
          <Field label="Título (EN)" value={content.specialties.titleEn} onChange={(v) => updateContent((p) => ({ ...p, specialties: { ...p.specialties, titleEn: v } }))} />
          <Field label="Subtítulo (ES)" value={content.specialties.subtitleEs} multiline onChange={(v) => updateContent((p) => ({ ...p, specialties: { ...p.specialties, subtitleEs: v } }))} />
          <Field label="Subtítulo (EN)" value={content.specialties.subtitleEn} multiline onChange={(v) => updateContent((p) => ({ ...p, specialties: { ...p.specialties, subtitleEn: v } }))} />
          {content.specialties.items.map((item, idx) => (
            <div key={item.id} style={{ padding: '12px 0', borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4A5240', marginBottom: 8 }}>#{item.id}</div>
              <Field label="Título (ES)" value={item.title.es} onChange={(v) => updateContent((p) => {
                const items = [...p.specialties.items]; items[idx] = { ...items[idx], title: { ...items[idx].title, es: v } }; return { ...p, specialties: { ...p.specialties, items } }
              })} />
              <Field label="Título (EN)" value={item.title.en} onChange={(v) => updateContent((p) => {
                const items = [...p.specialties.items]; items[idx] = { ...items[idx], title: { ...items[idx].title, en: v } }; return { ...p, specialties: { ...p.specialties, items } }
              })} />
              <Field label="Desc (ES)" value={item.desc.es} multiline onChange={(v) => updateContent((p) => {
                const items = [...p.specialties.items]; items[idx] = { ...items[idx], desc: { ...items[idx].desc, es: v } }; return { ...p, specialties: { ...p.specialties, items } }
              })} />
              <Field label="Desc (EN)" value={item.desc.en} multiline onChange={(v) => updateContent((p) => {
                const items = [...p.specialties.items]; items[idx] = { ...items[idx], desc: { ...items[idx].desc, en: v } }; return { ...p, specialties: { ...p.specialties, items } }
              })} />
            </div>
          ))}
        </Section>

        {/* PROCESS */}
        <Section title="🔄 Proceso">
          <Field label="Título (ES)" value={content.process.titleEs} onChange={(v) => updateContent((p) => ({ ...p, process: { ...p.process, titleEs: v } }))} />
          <Field label="Título (EN)" value={content.process.titleEn} onChange={(v) => updateContent((p) => ({ ...p, process: { ...p.process, titleEn: v } }))} />
          <Field label="Subtítulo (ES)" value={content.process.subtitleEs} multiline onChange={(v) => updateContent((p) => ({ ...p, process: { ...p.process, subtitleEs: v } }))} />
          <Field label="Subtítulo (EN)" value={content.process.subtitleEn} multiline onChange={(v) => updateContent((p) => ({ ...p, process: { ...p.process, subtitleEn: v } }))} />
          {content.process.steps.map((step, idx) => (
            <div key={step.id} style={{ padding: '12px 0', borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4A5240', marginBottom: 8 }}>Paso {step.id}</div>
              <Field label="Título (ES)" value={step.title.es} onChange={(v) => updateContent((p) => {
                const steps = [...p.process.steps]; steps[idx] = { ...steps[idx], title: { ...steps[idx].title, es: v } }; return { ...p, process: { ...p.process, steps } }
              })} />
              <Field label="Título (EN)" value={step.title.en} onChange={(v) => updateContent((p) => {
                const steps = [...p.process.steps]; steps[idx] = { ...steps[idx], title: { ...steps[idx].title, en: v } }; return { ...p, process: { ...p.process, steps } }
              })} />
              <Field label="Desc (ES)" value={step.desc.es} multiline onChange={(v) => updateContent((p) => {
                const steps = [...p.process.steps]; steps[idx] = { ...steps[idx], desc: { ...steps[idx].desc, es: v } }; return { ...p, process: { ...p.process, steps } }
              })} />
              <Field label="Desc (EN)" value={step.desc.en} multiline onChange={(v) => updateContent((p) => {
                const steps = [...p.process.steps]; steps[idx] = { ...steps[idx], desc: { ...steps[idx].desc, en: v } }; return { ...p, process: { ...p.process, steps } }
              })} />
            </div>
          ))}
        </Section>

        {/* BRANDS */}
        <Section title="🤝 Aliados">
          <Field label="Título (ES)" value={content.brands.titleEs} onChange={(v) => updateContent((p) => ({ ...p, brands: { ...p.brands, titleEs: v } }))} />
          <Field label="Título (EN)" value={content.brands.titleEn} onChange={(v) => updateContent((p) => ({ ...p, brands: { ...p.brands, titleEn: v } }))} />
          <Field label="Descripción (ES)" value={content.brands.descEs} multiline onChange={(v) => updateContent((p) => ({ ...p, brands: { ...p.brands, descEs: v } }))} />
          <Field label="Descripción (EN)" value={content.brands.descEn} multiline onChange={(v) => updateContent((p) => ({ ...p, brands: { ...p.brands, descEn: v } }))} />
          <Field label="Descripción 2 (ES)" value={content.brands.desc2Es} multiline onChange={(v) => updateContent((p) => ({ ...p, brands: { ...p.brands, desc2Es: v } }))} />
          <Field label="Descripción 2 (EN)" value={content.brands.desc2En} multiline onChange={(v) => updateContent((p) => ({ ...p, brands: { ...p.brands, desc2En: v } }))} />

          {/* Logos Manager */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Logos de Aliados ({content.brands.logos?.length || 0})
              </span>
              <button
                type="button"
                onClick={() => updateContent((p) => ({
                  ...p,
                  brands: {
                    ...p.brands,
                    logos: [...(p.brands.logos || []), { id: Date.now().toString(), name: 'Nueva Marca', image: '' }]
                  }
                }))}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#4A5240',
                  border: 'none',
                  borderRadius: 4,
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                + Agregar Logo
              </button>
            </div>

            {(content.brands.logos || []).map((logo, idx) => (
              <div
                key={logo.id || idx}
                style={{
                  backgroundColor: '#161616',
                  border: '1px solid #282828',
                  borderRadius: 6,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>Logo #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => updateContent((p) => ({
                      ...p,
                      brands: {
                        ...p.brands,
                        logos: (p.brands.logos || []).filter((_, i) => i !== idx)
                      }
                    }))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4d4d',
                      fontSize: 14,
                      cursor: 'pointer',
                      padding: 2,
                    }}
                    title="Eliminar este logo"
                  >
                    ✕
                  </button>
                </div>
                <Field
                  label="Nombre de Marca"
                  value={logo.name}
                  onChange={(v) => updateContent((p) => {
                    const logos = [...(p.brands.logos || [])]
                    logos[idx] = { ...logos[idx], name: v }
                    return { ...p, brands: { ...p.brands, logos } }
                  })}
                />
                <ImageField
                  label="Logo (Subir archivo o URL)"
                  value={logo.image}
                  onChange={(v) => updateContent((p) => {
                    const logos = [...(p.brands.logos || [])]
                    logos[idx] = { ...logos[idx], image: v }
                    return { ...p, brands: { ...p.brands, logos } }
                  })}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section title="📧 Contacto">
          <Field label="Título (ES)" value={content.contact.titleEs} onChange={(v) => updateContent((p) => ({ ...p, contact: { ...p.contact, titleEs: v } }))} />
          <Field label="Título (EN)" value={content.contact.titleEn} onChange={(v) => updateContent((p) => ({ ...p, contact: { ...p.contact, titleEn: v } }))} />
          <Field label="Intro (ES)" value={content.contact.introEs} multiline onChange={(v) => updateContent((p) => ({ ...p, contact: { ...p.contact, introEs: v } }))} />
          <Field label="Intro (EN)" value={content.contact.introEn} multiline onChange={(v) => updateContent((p) => ({ ...p, contact: { ...p.contact, introEn: v } }))} />
          <Field label="Email" value={content.contact.email} onChange={(v) => updateContent((p) => ({ ...p, contact: { ...p.contact, email: v } }))} />
          <Field label="Ubicación" value={content.contact.location} onChange={(v) => updateContent((p) => ({ ...p, contact: { ...p.contact, location: v } }))} />
          <Field label="Instagram URL" value={content.contact.social.instagram} onChange={(v) => updateContent((p) => ({ ...p, contact: { ...p.contact, social: { ...p.contact.social, instagram: v } } }))} />
          <Field label="TikTok URL" value={content.contact.social.tiktok} onChange={(v) => updateContent((p) => ({ ...p, contact: { ...p.contact, social: { ...p.contact.social, tiktok: v } } }))} />
        </Section>
      </div>

      {/* Footer Actions */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #222',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleExport} style={btnStyle('#4A5240')}>
            📥 Exportar JSON
          </button>
          <button onClick={resetContent} style={btnStyle('#661111')}>
            🔄 Reset
          </button>
        </div>
        <button
          onClick={handleExitEditMode}
          style={{
            ...btnStyle('#1c1c1c'),
            border: '1px solid #333',
            color: '#aaa',
            fontSize: 11,
            padding: '8px 10px',
          }}
          title="Oculta el lápiz y sale del modo edición"
        >
          🔒 Salir del Modo Edición (Ocultar Lápiz)
        </button>
      </div>
    </div>
  )
}

const btnStyle = (bg: string): React.CSSProperties => ({
  flex: 1,
  padding: '10px 12px',
  backgroundColor: bg,
  border: 'none',
  borderRadius: 6,
  color: '#fff',
  fontSize: 12,
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'opacity 0.2s',
})
