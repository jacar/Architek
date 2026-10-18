import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { proyectosConCover, Proyecto } from '../data/proyectos'
import { useLanguage } from '../context/LanguageContext'
import { useEdit, defaultContent } from '../context/EditContext'
import { gsap } from '../lib/animations'

interface GalleryProps {
  onBackToHome: () => void
  initialProjectId?: string | null
  onLightboxChange?: (isOpen: boolean) => void
}

export function Gallery({ onBackToHome, initialProjectId, onLightboxChange }: GalleryProps) {
  const { lang, t } = useLanguage()
  const { content } = useEdit()
  const galleryData = content?.gallery || defaultContent.gallery

  // Dynamically merge editable gallery projects text with canonical static asset image arrays
  const activeProjectsList: Proyecto[] = proyectosConCover.map((original) => {
    const editableP = (galleryData.projects || []).find((p) => p.id === original.id)
    return {
      id: original.id,
      name: editableP?.name || original.name,
      location: editableP?.location || original.location,
      category: editableP?.category || original.category,
      cover: original.cover,
      images: (original.images && original.images.length > 0) ? original.images : [original.cover],
    }
  })

  const projectsToUse = activeProjectsList.length > 0 ? activeProjectsList : proyectosConCover

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeProject, setActiveProject] = useState<Proyecto | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  
  // Hero slider state
  const [heroIndex, setHeroIndex] = useState<number>(0)
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true)
  
  // Lens & Hero refs
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLImageElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const lensImageRef = useRef<HTMLImageElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const heroProjects: Proyecto[] = [
    projectsToUse.find((p) => p.id === 'casa-anam') || projectsToUse[0],
    projectsToUse.find((p) => p.id === 'quadro-500') || projectsToUse[1],
    projectsToUse.find((p) => p.id === 'loft-nj') || projectsToUse[2],
    projectsToUse.find((p) => p.id === 'verdi') || projectsToUse[3],
    projectsToUse.find((p) => p.id === 'casa-la-reserva') || projectsToUse[4],
  ].filter(Boolean) as Proyecto[]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  // Auto-open requested project lightbox if passed
  useEffect(() => {
    if (initialProjectId) {
      const target = projectsToUse.find((p) => p.id === initialProjectId)
      if (target) {
        setActiveProject(target)
        setActiveImageIndex(0)
      }
    }
  }, [initialProjectId, projectsToUse])

  // Notify parent container when project lightbox modal opens/closes
  useEffect(() => {
    onLightboxChange?.(!!activeProject)
  }, [activeProject, onLightboxChange])

  // Auto-slide Hero Slider
  useEffect(() => {
    if (!isAutoplay) return
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroProjects.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoplay, heroProjects.length])

  // GSAP animation when hero slide changes
  useEffect(() => {
    if (!heroImageRef.current || !heroTitleRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.15, opacity: 0.3, filter: 'brightness(0.4)' },
        { scale: 1.0, opacity: 1, filter: 'brightness(0.85)', duration: 1.2, ease: 'power2.out' }
      )
      gsap.fromTo(
        heroTitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [heroIndex])

  // Interactive Magnifying Negative Lens Mouse Movement
  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current || !lensRef.current || !lensImageRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const LENS_SIZE = 220

    // Move circular lens ring smoothly
    gsap.to(lensRef.current, {
      opacity: 1,
      x: x - LENS_SIZE / 2,
      y: y - LENS_SIZE / 2,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    // Align inner inverted image inside lens
    gsap.to(lensImageRef.current, {
      width: rect.width,
      height: rect.height,
      x: -(x - LENS_SIZE / 2),
      y: -(y - LENS_SIZE / 2),
      transformOrigin: `${x}px ${y}px`,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  const handleHeroMouseLeave = useCallback(() => {
    if (!lensRef.current) return
    gsap.to(lensRef.current, { opacity: 0, duration: 0.4 })
  }, [])

  // GSAP Scroll Parallax on Hero Section
  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-parallax-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('.hero-parallax-text', {
        yPercent: -15,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Animate grid cards on category change or mount
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.gallery-card')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      )
    }, gridRef)
    return () => ctx.revert()
  }, [selectedCategory])

  // Filter projects by category
  const filteredProjects = projectsToUse.filter((p) => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'residential') return p.category.es.toLowerCase().includes('residencial')
    if (selectedCategory === 'hospitality') return p.category.es.toLowerCase().includes('hotelería') || p.category.es.toLowerCase().includes('hotel')
    if (selectedCategory === 'commercial') return p.category.es.toLowerCase().includes('comercial')
    return true
  })

  // Lightbox navigation
  const handlePrevImage = () => {
    if (!activeProject) return
    setActiveImageIndex((prev) => (prev === 0 ? activeProject.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    if (!activeProject) return
    setActiveImageIndex((prev) => (prev === activeProject.images.length - 1 ? 0 : prev + 1))
  }

  // Touch swipe support for mobile lightbox navigation
  const touchStartX = useRef<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 45) handleNextImage()
    if (diff < -45) handlePrevImage()
    touchStartX.current = null
  }

  // Keyboard support for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeProject) return
      if (e.key === 'Escape') setActiveProject(null)
      if (e.key === 'ArrowLeft') handlePrevImage()
      if (e.key === 'ArrowRight') handleNextImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProject])

  // Preload adjacent images in lightbox for instantaneous browsing
  useEffect(() => {
    if (!activeProject || !activeProject.images || activeProject.images.length === 0) return
    const nextIdx = (activeImageIndex + 1) % activeProject.images.length
    const prevIdx = (activeImageIndex - 1 + activeProject.images.length) % activeProject.images.length
    const imgNext = new Image()
    imgNext.src = activeProject.images[nextIdx]
    const imgPrev = new Image()
    imgPrev.src = activeProject.images[prevIdx]
  }, [activeProject, activeImageIndex])

  // Preload next hero slide image
  useEffect(() => {
    if (heroProjects.length === 0) return
    const nextHeroIdx = (heroIndex + 1) % heroProjects.length
    if (heroProjects[nextHeroIdx]?.cover) {
      const img = new Image()
      img.src = heroProjects[nextHeroIdx].cover
    }
  }, [heroIndex, heroProjects])

  const currentHero = heroProjects[heroIndex] || heroProjects[0] || projectsToUse[0]

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-fg)',
        paddingTop: '90px',
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* ── HERO SLIDER WITH MAGNIFYING NEGATIVE LENS EFFECT ──────────────────── */}
      <div
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{
          width: '100%',
          height: 'clamp(500px, 70vh, 750px)',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0A0A0A',
          marginBottom: '60px',
          cursor: 'crosshair',
        }}
      >
        {/* Normal Fitted Background Image */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '120%', top: '-10%' }}>
          <img
            ref={heroImageRef}
            className="hero-parallax-bg"
            src={currentHero.cover}
            alt={currentHero.name}
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.85)',
              willChange: 'transform, filter, opacity',
            }}
          />
        </div>

        {/* Ambient Dark Gradient Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 30%, rgba(10,10,10,0.85) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 40%, rgba(10,10,10,0.9) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── MAGNIFYING LENS WITH NEGATIVE INVERTED LIGHTING FILTER ──────────── */}
        <div
          ref={lensRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            border: '2px solid var(--color-accent)',
            boxShadow: '0 0 35px rgba(74, 82, 64, 0.6), inset 0 0 25px rgba(255, 255, 255, 0.25)',
            pointerEvents: 'none',
            opacity: 0,
            zIndex: 20,
            overflow: 'hidden',
            backgroundColor: '#0A0A0A',
            willChange: 'transform, opacity',
          }}
        >
          {/* Inner Inverted / Negative Magnified Image */}
          <img
            ref={lensImageRef}
            src={currentHero.cover}
            alt="Negative Lens View"
            decoding="async"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              maxWidth: 'none',
              maxHeight: 'none',
              objectFit: 'cover',
              filter: 'invert(100%) hue-rotate(180deg) contrast(1.3) brightness(1.15)',
              transform: 'scale(1.35)',
              willChange: 'transform, width, height',
            }}
          />

          {/* Lens Glass Glare Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(74,82,64,0.3) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Floating Header Actions Bar */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: 'clamp(24px, 5vw, 60px)',
            right: 'clamp(24px, 5vw, 60px)',
            zIndex: 30,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Back Button */}
          <button
            onClick={onBackToHome}
            style={{
              background: 'rgba(10,10,10,0.7)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#FFFFFF',
              padding: '10px 22px',
              borderRadius: '100px',
              fontSize: '13px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(12px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              e.currentTarget.style.transform = 'translateX(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              e.currentTarget.style.backgroundColor = 'rgba(10,10,10,0.7)'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {lang === 'ES' ? (galleryData.backHomeTextEs || 'Volver al Inicio') : (galleryData.backHomeTextEn || 'Back to Home')}
          </button>

          {/* Lighting Concept Badge */}
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              fontWeight: 700,
              backgroundColor: 'rgba(10,10,10,0.7)',
              padding: '8px 18px',
              borderRadius: '100px',
              border: '1px solid var(--color-accent)',
              backdropFilter: 'blur(10px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', boxShadow: '0 0 10px var(--color-accent)' }} />
            {lang === 'ES' ? (galleryData.badgeEs || 'ARQUITECTURA EN LUZ & CONTROL') : (galleryData.badgeEn || 'ARCHITECTURE IN LIGHT & CONTROL')}
          </span>
        </div>

        {/* Hero Central Content */}
        <div
          className="hero-parallax-text"
          style={{
            position: 'absolute',
            bottom: '60px',
            left: 'clamp(24px, 5vw, 60px)',
            right: 'clamp(24px, 5vw, 60px)',
            zIndex: 25,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          {/* Main Title & Subtitle */}
          <div style={{ maxWidth: '750px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                letterSpacing: '0.3em',
                color: '#EDE8DF',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'block',
                marginBottom: '12px',
                textShadow: '0 2px 8px rgba(0,0,0,0.85)',
              }}
            >
              {lang === 'ES' ? currentHero.category.es : currentHero.category.en} • {currentHero.location}
            </span>
            <h1
              ref={heroTitleRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 7vw, 84px)',
                fontWeight: 700,
                color: '#FFFFFF',
                margin: '0 0 16px 0',
                lineHeight: 1.05,
                textTransform: 'uppercase',
                textShadow: '0 10px 40px rgba(0,0,0,0.8)',
              }}
            >
              {currentHero.name}
            </h1>
            <button
              onClick={() => {
                setActiveProject(currentHero)
                setActiveImageIndex(0)
              }}
              style={{
                background: 'var(--color-accent)',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '100px',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(74, 82, 64, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              {t(`Explorar Fotos (${currentHero.images.length})`, `Explore Photos (${currentHero.images.length})`)}
            </button>
          </div>

          {/* Slider Pagination Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
            {/* Slide Index counter */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.1em',
              }}
            >
              0{heroIndex + 1} <span style={{ opacity: 0.3, fontSize: '18px' }}>/ 0{heroProjects.length}</span>
            </div>

            {/* Thumbnail dots / progress bar */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {heroProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setIsAutoplay(false)
                    setHeroIndex(idx)
                  }}
                  title={p.name}
                  style={{
                    width: idx === heroIndex ? '36px' : '10px',
                    height: '6px',
                    borderRadius: '100px',
                    backgroundColor: idx === heroIndex ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PORTFOLIO SECTION HEADER & FILTERS ──────────────────────────────── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 60px)' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                letterSpacing: '0.25em',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              {lang === 'ES' ? (galleryData.catalogueTitleEs || 'Catálogo Completo') : (galleryData.catalogueTitleEn || 'Complete Catalogue')}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 700,
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {lang === 'ES' ? (galleryData.allProjectsTitleEs || 'Todas las Obras') : (galleryData.allProjectsTitleEn || 'All Projects')}
            </h2>
          </div>

          {/* Category Filters */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {[
              { id: 'all', labelEs: 'Todos los Proyectos', labelEn: 'All Projects' },
              { id: 'residential', labelEs: 'Residencial', labelEn: 'Residential' },
              { id: 'hospitality', labelEs: 'Hotelería', labelEn: 'Hospitality' },
              { id: 'commercial', labelEs: 'Comercial', labelEn: 'Commercial' },
            ].map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '100px',
                    border: isActive ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                    backgroundColor: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.03)',
                    color: isActive ? '#FFFFFF' : 'var(--color-fg)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {lang === 'ES' ? cat.labelEs : cat.labelEn}
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '32px',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="gallery-card"
              onClick={() => {
                setActiveProject(project)
                setActiveImageIndex(0)
              }}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                willChange: 'transform',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  aspectRatio: '4/3',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#111',
                }}
              >
                <img
                  src={project.cover}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    if (project.images && project.images[0] && e.currentTarget.src !== project.images[0]) {
                      e.currentTarget.src = project.images[0]
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                
                {/* Photo count badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(10, 10, 10, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  {project.images.length} {t('Fotos', 'Photos')}
                </div>
              </div>

              {/* Card Footer Info */}
              <div style={{ padding: '24px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: '#C7BFA7',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  {lang === 'ES' ? project.category.es : project.category.en}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 700,
                    margin: '0 0 8px 0',
                    color: 'var(--color-fg)',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: 'var(--color-muted-fg)',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal for detailed project images (Portaled directly to body to bypass stacking contexts) */}
      {activeProject && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.name}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveProject(null)
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(10, 10, 10, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(12px, 2vh, 24px) clamp(16px, 3vw, 32px)',
          }}
        >
          {/* Lightbox Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#FFFFFF',
              zIndex: 30,
              padding: '4px 8px',
              gap: '16px',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  margin: 0,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  letterSpacing: '0.02em',
                }}
              >
                {activeProject.name}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  color: 'rgba(255,255,255,0.7)',
                  margin: '3px 0 0 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {activeProject.location} • {lang === 'ES' ? activeProject.category.es : activeProject.category.en}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                {activeImageIndex + 1} / {activeProject.images.length}
              </span>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveProject(null)
                }}
                aria-label={t('Cerrar galería', 'Close gallery')}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#FFFFFF',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  flexShrink: 0,
                  zIndex: 40,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.transform = 'scale(1.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Display Image */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '12px 0',
              overflow: 'hidden',
              touchAction: 'pan-y',
            }}
          >
            {/* Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevImage()
              }}
              aria-label={t('Foto anterior', 'Previous photo')}
              style={{
                position: 'absolute',
                left: 'clamp(10px, 2vw, 24px)',
                zIndex: 30,
                background: 'rgba(10,10,10,0.75)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#FFFFFF',
                width: 'clamp(42px, 4vw, 52px)',
                height: 'clamp(42px, 4vw, 52px)',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.backgroundColor = 'rgba(10,10,10,0.75)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Active Image */}
            <img
              src={activeProject.images[activeImageIndex] || activeProject.cover}
              alt={`${activeProject.name} ${activeImageIndex + 1}`}
              decoding="async"
              onError={(e) => {
                if (activeProject.cover && e.currentTarget.src !== activeProject.cover) {
                  e.currentTarget.src = activeProject.cover
                }
              }}
              style={{
                maxHeight: '74vh',
                maxWidth: '92vw',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.85)',
                transition: 'opacity 0.2s ease',
                userSelect: 'none',
              }}
            />

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNextImage()
              }}
              aria-label={t('Foto siguiente', 'Next photo')}
              style={{
                position: 'absolute',
                right: 'clamp(10px, 2vw, 24px)',
                zIndex: 30,
                background: 'rgba(10,10,10,0.75)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#FFFFFF',
                width: 'clamp(42px, 4vw, 52px)',
                height: 'clamp(42px, 4vw, 52px)',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.backgroundColor = 'rgba(10,10,10,0.75)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Thumbnails Footer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              overflowX: 'auto',
              padding: '8px 0',
              maxHeight: '76px',
            }}
          >
            {activeProject.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  background: 'none',
                  border: idx === activeImageIndex ? '2px solid #FFFFFF' : '2px solid transparent',
                  padding: 0,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  opacity: idx === activeImageIndex ? 1 : 0.45,
                  transition: 'opacity 0.2s ease, border-color 0.2s ease',
                  flexShrink: 0,
                }}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '64px',
                    height: '46px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
