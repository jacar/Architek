import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'

interface HeaderProps {
  menuOpen: boolean
  onMenuToggle: () => void
  onLogoClick?: () => void
}

export function Header({ menuOpen, onMenuToggle, onLogoClick }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      )
    }, headerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogo = () => {
    if (onLogoClick) {
      onLogoClick()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const toggleLang = () => {
    setLang(lang === 'ES' ? 'EN' : 'ES')
  }

  return (
    <header
      ref={headerRef}
      className="header-inner"
      aria-label="Navegación principal"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: 'clamp(20px, 3vw, 32px) clamp(24px, 5vw, 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: 0,
        transition: 'background-color 0.5s ease',
        backgroundColor: scrolled && !menuOpen ? 'color-mix(in srgb, var(--color-bg) 85%, transparent)' : 'transparent',
        backdropFilter: scrolled && !menuOpen ? 'blur(12px)' : 'none',
      }}
    >
      {/* Logo */}
      <button
        onClick={handleLogo}
        aria-label="Ir al inicio"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 700,
            color: 'var(--color-fg)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          ARCHTEK STUDIO
        </span>
      </button>

      {/* Right side: Lang Switcher + Menu Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button
          onClick={toggleLang}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-fg)',
            display: 'flex',
            gap: '8px',
          }}
        >
          <span style={{ opacity: lang === 'ES' ? 1 : 0.4 }}>ES</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ opacity: lang === 'EN' ? 1 : 0.4 }}>EN</span>
        </button>

        {/* Menu toggle */}
        <button
          onClick={onMenuToggle}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 7,
          }}
        >
          <span
            style={{
              display: 'block',
              width: menuOpen ? 24 : 32,
              height: 2,
              backgroundColor: 'var(--color-fg)',
              transformOrigin: 'center',
              transform: menuOpen ? 'translateY(4.5px) rotate(45deg)' : 'none',
              transition: 'width 0.35s ease, transform 0.35s ease',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 2,
              backgroundColor: 'var(--color-fg)',
              transformOrigin: 'center',
              transform: menuOpen ? 'translateY(-4.5px) rotate(-45deg)' : 'none',
              transition: 'transform 0.35s ease, opacity 0.35s ease',
            }}
          />
        </button>
      </div>
    </header>
  )
}
