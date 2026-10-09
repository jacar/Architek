import { useEffect, useRef, useCallback } from 'react'
import { gsap, ScrollTrigger, fadeUp } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'
import { useEdit } from '../context/EditContext'

// ─── Logo Card with Spotlight Glow ───────────────────────────────────────────
function LogoCard({ logo, index }: { logo: { id: string; name: string; image: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const imgRef  = useRef<HTMLImageElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current || !glowRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    gsap.to(glowRef.current, {
      '--gx': `${x}px`,
      '--gy': `${y}px`,
      duration: 0.2,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!glowRef.current || !imgRef.current || !cardRef.current) return
    gsap.to(glowRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(imgRef.current, {
      filter: 'grayscale(0%) brightness(1.1)',
      scale: 1.08,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(cardRef.current, {
      y: -5,
      borderColor: 'rgba(184,160,110,0.4)',
      duration: 0.35,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current || !imgRef.current || !cardRef.current) return
    gsap.to(glowRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' })
    gsap.to(imgRef.current, {
      filter: 'grayscale(100%) brightness(0.9)',
      scale: 1,
      opacity: 0.55,
      duration: 0.5,
      ease: 'power2.inOut',
    })
    gsap.to(cardRef.current, {
      y: 0,
      borderColor: 'rgba(128,128,128,0.15)',
      boxShadow: '0 0 0px rgba(184,160,110,0)',
      duration: 0.5,
      ease: 'power2.inOut',
    })
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    card.addEventListener('mousemove',  handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      card.removeEventListener('mousemove',  handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  return (
    <div
      ref={cardRef}
      className="brand-card"
      data-index={index}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: '200px',
        height: '110px',
        borderRadius: '14px',
        border: '1px solid rgba(128,128,128,0.15)',
        backgroundColor: 'var(--color-surface)',
        overflow: 'hidden',
        cursor: 'pointer',
        willChange: 'transform',
        opacity: 0,
        transform: 'translateX(30px)',
      }}
    >
      {/* Spotlight glow — outer wide halo */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: `radial-gradient(
            160px circle at var(--gx, 50%) var(--gy, 50%),
            rgba(220,190,120,0.70) 0%,
            rgba(184,160,110,0.35) 35%,
            rgba(184,160,110,0.10) 60%,
            transparent 80%
          )`,
          '--gx': '50%',
          '--gy': '50%',
        } as React.CSSProperties}
      />

      {/* Spotlight — inner hot core */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: `radial-gradient(
            50px circle at var(--gx, 50%) var(--gy, 50%),
            rgba(255,230,160,0.55) 0%,
            transparent 100%
          )`,
          '--gx': '50%',
          '--gy': '50%',
          transition: 'opacity 0.3s ease',
        } as React.CSSProperties}
        ref={(el) => {
          if (el && glowRef.current) {
            // sync position via CSS var inheritance from parent card
            el.style.setProperty('--gx', glowRef.current.style.getPropertyValue('--gx') || '50%')
            el.style.setProperty('--gy', glowRef.current.style.getPropertyValue('--gy') || '50%')
          }
        }}
      />

      {/* Logo */}
      {logo.image ? (
        <img
          ref={imgRef}
          src={logo.image}
          alt={logo.name}
          title={logo.name}
          style={{
            width: '70%',
            height: '65%',
            objectFit: 'contain',
            objectPosition: 'center',
            filter: 'grayscale(100%) brightness(0.9)',
            opacity: 0.55,
            display: 'block',
            position: 'relative',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--color-fg)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          opacity: 0.4,
          position: 'relative',
          zIndex: 1,
        }}>
          {logo.name}
        </span>
      )}
    </div>
  )
}

// ─── Main Brands Section ──────────────────────────────────────────────────────
export function Brands() {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const isDragging  = useRef(false)
  const startX      = useRef(0)
  const scrollLeft  = useRef(0)
  const velRef      = useRef(0)
  const lastX       = useRef(0)
  const rafRef      = useRef<number | null>(null)

  const { t } = useLanguage()
  const { content } = useEdit()
  const brands = content.brands
  const logosList = (brands.logos && brands.logos.length > 0) ? brands.logos : []

  // ── Smooth wheel → horizontal scroll ───────────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      // Only hijack when cursor is inside the track
      e.preventDefault()
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX
      gsap.to(el, {
        scrollLeft: el.scrollLeft + delta * 1.4,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // ── Click-drag scroll with momentum ────────────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const onDown = (e: MouseEvent) => {
      isDragging.current = true
      startX.current = e.pageX - el.offsetLeft
      scrollLeft.current = el.scrollLeft
      lastX.current = e.pageX
      velRef.current = 0
      el.style.cursor = 'grabbing'
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }

    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX.current) * 1.2
      velRef.current = e.pageX - lastX.current
      lastX.current = e.pageX
      el.scrollLeft = scrollLeft.current - walk
    }

    const onUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      el.style.cursor = 'grab'
      // Momentum coast
      const coast = () => {
        if (Math.abs(velRef.current) < 0.5) return
        el.scrollLeft -= velRef.current * 0.9
        velRef.current *= 0.88
        rafRef.current = requestAnimationFrame(coast)
      }
      coast()
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    el.style.cursor = 'grab'

    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── GSAP entrance animations ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = sectionRef.current?.querySelectorAll<HTMLElement>('.brand-text')
      if (texts?.length) {
        fadeUp(texts, sectionRef.current as HTMLElement, { stagger: 0.18, start: 'top 82%' })
      }

      const cards = trackRef.current?.querySelectorAll<HTMLElement>('.brand-card')
      if (cards?.length) {
        gsap.to(cards, {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: { each: 0.06, from: 'start' },
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [logosList.length])

  return (
    <section
      ref={sectionRef}
      id="brands"
      style={{
        padding: 'clamp(80px, 12vw, 160px) 0',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-fg)',
        overflow: 'hidden',
      }}
    >
      {/* ── Heading + description ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <h2
          className="brand-text"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700,
            color: 'var(--color-fg)',
            margin: '0 0 24px 0',
            opacity: 0,
          }}
        >
          {t(brands.titleEs, brands.titleEn)}
        </h2>

        <div
          className="brand-text"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: 800,
            marginBottom: 'clamp(48px, 6vw, 80px)',
            opacity: 0,
          }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.5vw, 20px)', color: 'var(--color-muted-fg)', lineHeight: 1.6 }}>
            {t(brands.descEs, brands.descEn)}
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px, 1.2vw, 16px)', color: 'var(--color-muted-fg)', lineHeight: 1.6, fontWeight: 600 }}>
            {t(brands.desc2Es, brands.desc2En)}
          </p>
        </div>
      </div>

      {/* ── Horizontal scroll track ── */}
      {/* Fade edges */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to left, var(--color-bg) 0%, transparent 100%)',
        }} />

        {/* Scrollable wrapper */}
        <div
          ref={wrapperRef}
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',      // Firefox
            msOverflowStyle: 'none',     // IE
            paddingBottom: '4px',
            userSelect: 'none',
          }}
        >
          {/* Hide webkit scrollbar */}
          <style>{`::-webkit-scrollbar { display: none; }`}</style>

          {/* Track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              padding: '12px clamp(24px, 5vw, 80px) 20px',
              width: 'max-content',
            }}
          >
            {logosList.map((logo, i) => (
              <LogoCard key={logo.id} logo={logo} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '20px clamp(24px, 5vw, 80px) 0',
        opacity: 0.4,
      }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <path d="M1 6h16M11 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          {t('Desliza para explorar', 'Drag to explore')}
        </span>
      </div>

    </section>
  )
}
