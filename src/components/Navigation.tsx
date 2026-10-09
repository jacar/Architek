import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'

const NAV_LINKS = [
  { id: 'projects', href: '#projects', type: 'section', es: 'Proyectos', en: 'Projects' },
  { id: 'gallery', type: 'gallery', es: 'Galería de Fotos', en: 'Photo Gallery' },
  { id: 'about', href: '#about', type: 'section', es: 'Nosotros', en: 'About' },
  { id: 'specialties', href: '#specialties', type: 'section', es: 'Especialidades', en: 'Specialties' },
  { id: 'brands', href: '#brands', type: 'section', es: 'Marcas', en: 'Brands' },
  { id: 'contact', href: '#contact', type: 'section', es: 'Contacto', en: 'Contact' },
]

interface NavigationProps {
  isOpen: boolean
  onClose: () => void
  onNavigateHome: (sectionId?: string) => void
  onNavigateGallery: () => void
}

export function Navigation({ isOpen, onClose, onNavigateHome, onNavigateGallery }: NavigationProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const { lang } = useLanguage()

  useEffect(() => {
    const overlay = overlayRef.current
    const list = listRef.current
    if (!overlay || !list) return

    gsap.set(overlay, { clipPath: 'inset(0 0 100% 0)' })
    gsap.set([...Array.from(list.children)], {
      y: 60,
      opacity: 0,
    })

    const tl = gsap.timeline({ paused: true })
    tl.to(overlay, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.85,
      ease: 'power4.inOut',
    }).to(
      list.children,
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.75, ease: 'power3.out' },
      '-=0.4'
    )

    tlRef.current = tl
    return () => { tl.kill() }
  }, [])

  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      tl.play()
    } else {
      document.body.style.overflow = ''
      tl.reverse()
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleLinkClick = (link: typeof NAV_LINKS[0]) => {
    onClose()
    setTimeout(() => {
      if (link.type === 'gallery') {
        onNavigateGallery()
      } else {
        onNavigateHome(link.href)
      }
    }, 400)
  }

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
      aria-hidden={!isOpen}
      className="nav-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-bg)',
        zIndex: 89,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(80px, 10vw, 140px) clamp(40px, 6vw, 80px)',
        clipPath: 'inset(0 0 100% 0)',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <ul ref={listRef} style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
        {NAV_LINKS.map((link) => (
          <li key={link.id} style={{ overflow: 'hidden', lineHeight: 1.2, margin: '16px 0' }}>
            <button
              onClick={() => handleLinkClick(link)}
              tabIndex={isOpen ? 0 : -1}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4.5vw, 56px)',
                fontWeight: 700,
                color: link.type === 'gallery' ? 'var(--color-accent)' : 'var(--color-fg)',
                cursor: 'pointer',
                padding: '4px 0',
                display: 'block',
                textTransform: 'uppercase',
                transition: 'color 0.25s, transform 0.25s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = 'var(--color-accent)'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = link.type === 'gallery' ? 'var(--color-accent)' : 'var(--color-fg)'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              }}
            >
              {lang === 'ES' ? link.es : link.en}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
