import { useEffect, useRef } from 'react'
import { gsap, revealClip, fadeUp, ScrollTrigger } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'
import { useEdit } from '../context/EditContext'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { lang, t } = useLanguage()
  const { content } = useEdit()
  const about = content.about

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Parallax for Title (Right to Left)
      const title = sectionRef.current?.querySelector('.about-title') as HTMLElement
      if (title) {
        gsap.fromTo(title, 
          { xPercent: 15 },
          { xPercent: -15, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
        )
      }

      // Manifesto + body
      const manifesto = sectionRef.current?.querySelector('.about-manifesto') as HTMLElement
      if (manifesto) fadeUp(manifesto, manifesto, { delay: 0.1 })

      const body = sectionRef.current?.querySelector('.about-body') as HTMLElement
      if (body) fadeUp(body, body, { delay: 0.15 })

      // Stats
      const stats = sectionRef.current?.querySelectorAll<HTMLElement>('.about-stat')
      const statsWrap = sectionRef.current?.querySelector('.about-stats') as HTMLElement
      if (stats?.length && statsWrap) {
        fadeUp(stats, statsWrap, { stagger: 0.1 })
        gsap.fromTo(statsWrap,
          { xPercent: -10 },
          { xPercent: 10, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
        )
      }
      
      const values = sectionRef.current?.querySelectorAll<HTMLElement>('.about-value')
      const valuesWrap = sectionRef.current?.querySelector('.about-values') as HTMLElement
      if (values?.length && valuesWrap) {
        fadeUp(values, valuesWrap, { stagger: 0.1 })
        gsap.fromTo(valuesWrap,
          { xPercent: 10 },
          { xPercent: -10, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Sobre el estudio"
      style={{
        padding: 'clamp(48px, 6vw, 76px) clamp(20px, 5vw, 60px)',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-fg)',
      }}
    >
      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(28px, 4vw, 56px)',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div className="about-text-col">
          <div className="about-title" style={{ marginBottom: 'clamp(20px, 3vw, 36px)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 72px)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--color-fg)',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              {t(about.titleEs, about.titleEn)}
            </h2>
          </div>

          <p
            className="about-manifesto"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(15px, 1.4vw, 19px)',
              fontWeight: 400,
              color: 'var(--color-fg)',
              lineHeight: 1.75,
              marginBottom: 'clamp(16px, 2vw, 24px)',
              maxWidth: 800,
              opacity: 0,
            }}
          >
            {t(about.manifestoEs, about.manifestoEn)}
          </p>

          <p
            className="about-body"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              color: 'var(--color-muted-fg)',
              lineHeight: 1.8,
              marginBottom: 'clamp(28px, 3.5vw, 40px)',
              maxWidth: 600,
              opacity: 0,
            }}
          >
            {t(about.bodyEs, about.bodyEn)}
          </p>

          {/* Stats */}
          <div
            className="about-stats"
            style={{
              display: 'flex',
              gap: 'clamp(32px, 5vw, 64px)',
              paddingTop: 'clamp(20px, 2.5vw, 32px)',
              borderTop: '1px solid color-mix(in srgb, var(--color-fg) 20%, transparent)',
              flexWrap: 'wrap',
              marginBottom: 'clamp(28px, 3.5vw, 40px)',
            }}
          >
            {about.stats.map((stat, idx) => (
              <div key={idx} className="about-stat" style={{ opacity: 0 }}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px, 4vw, 64px)',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    letterSpacing: '0.1em',
                    color: 'var(--color-fg)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {t(stat.labelEs, stat.labelEn)}
                </span>
              </div>
            ))}

            <div className="about-stat" style={{ opacity: 0, alignSelf: 'center' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  letterSpacing: '0.1em',
                  color: 'var(--color-fg)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {t(about.countriesEs, about.countriesEn)}
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  color: 'var(--color-muted-fg)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {t(about.sectorsEs, about.sectorsEn)}
              </span>
            </div>
          </div>

          {/* Values */}
          <div 
            className="about-values"
            style={{
              paddingTop: 'clamp(20px, 2.5vw, 32px)',
              borderTop: '1px solid color-mix(in srgb, var(--color-fg) 20%, transparent)',
            }}
          >
            {about.values.map((val, idx) => (
              <div key={idx} className="about-value" style={{ opacity: 0, marginBottom: '14px' }}>
                <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>
                  — {t(val.titleEs, val.titleEn)} —
                </strong>{' '}
                <span style={{ fontFamily: 'var(--font-sans)' }}>
                  {t(val.descEs, val.descEn)}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
