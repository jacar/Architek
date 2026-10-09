import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'
import { proyectosConCover } from '../data/proyectos'

interface ProjectListProps {
  onViewGallery?: (projectId?: string) => void
}

export function ProjectList({ onViewGallery }: ProjectListProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { lang, t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card') as HTMLElement[]
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          pin: true,
          scrub: true,
          end: `+=${cards.length * 80}%`,
          anticipatePin: 1,
        }
      })

      cards.forEach((card, index) => {
        const img = card.querySelector('.project-image-parallax')
        const overlay = card.querySelector('.project-dark-overlay')
        
        if (index > 0) {
          gsap.set(card, { yPercent: 100, force3D: true })
          if (img) gsap.set(img, { scale: 1, force3D: true })
          if (overlay) gsap.set(overlay, { opacity: 0.65 })

          const cardTl = gsap.timeline()
          cardTl.to(card, { yPercent: 0, ease: 'none', duration: 1 }, 0)
          
          if (img) {
            cardTl.to(img, { scale: 1.08, ease: 'none', duration: 1 }, 0)
          }
          if (overlay) {
            cardTl.to(overlay, { opacity: 0.1, ease: 'none', duration: 1 }, 0)
          }

          tl.add(cardTl)
        } else {
          // First card is already visible
          gsap.set(card, { yPercent: 0, force3D: true })
          if (img) gsap.set(img, { scale: 1.08, force3D: true })
          if (overlay) gsap.set(overlay, { opacity: 0.1 })
        }
      })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating Header Layer */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0,
        zIndex: 50, 
        padding: 'clamp(80px, 10vw, 110px) clamp(24px, 5vw, 60px)', 
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: 0,
              textShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}
          >
            {t('Proyectos Destacados', 'Featured Projects')}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 550,
              marginTop: 16,
              textShadow: '0 2px 10px rgba(0,0,0,0.6)'
            }}
          >
            {t(
              'Una selección de nuestras obras donde la luz y la arquitectura se funden en perfecta armonía.',
              'A selection of our works where light and architecture merge in perfect harmony.'
            )}
          </p>
        </div>

        {/* View All Projects Button */}
        {onViewGallery && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onViewGallery()
            }}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(0, 0, 0, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: '100px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.25s ease',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              e.currentTarget.style.color = '#000000'
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.75)'
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span>{t('Ver todos los proyectos', 'View all projects')}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        )}
      </div>

      {/* Projects Stack */}
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {proyectosConCover.map((project, i) => (
          <div
            key={project.id}
            className="project-card group"
            onClick={() => onViewGallery?.(project.id)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: i,
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Background Image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <img
                className="project-image-parallax"
                src={project.cover}
                alt={project.name}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Darkening Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* GPU-Accelerated Darkness Dimmer Overlay */}
            <div
              className="project-dark-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#000000',
                opacity: 0.1,
                pointerEvents: 'none',
              }}
            />

            {/* Pure CSS Hover Info Overlay (Zero JS state re-renders) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '40px',
                zIndex: 10,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  letterSpacing: '0.25em',
                  color: 'var(--color-accent)',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  fontWeight: 600,
                  pointerEvents: 'none',
                }}
              >
                {lang === 'ES' ? project.category.es : project.category.en}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 6vw, 80px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: '0 0 16px 0',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                }}
              >
                {project.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  color: '#F5F5F0',
                  margin: '0 0 24px 0',
                  letterSpacing: '0.05em',
                  opacity: 0.9,
                  pointerEvents: 'none',
                }}
              >
                {project.location}
              </p>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onViewGallery?.(project.id)
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid var(--color-accent)',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                  pointerEvents: 'auto',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)'
                  e.currentTarget.style.color = '#000000'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
              >
                {t('Ver Galería Completa', 'View Full Gallery')} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

