import { useEffect, useRef } from 'react'
import { gsap, fadeUp } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'
import { useEdit } from '../context/EditContext'

export function Specialties() {
  const sectionRef = useRef<HTMLElement>(null)
  const { lang, t } = useLanguage()
  const { content } = useEdit()
  const spec = content.specialties

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.specialty-card')
      const cardsWrap = sectionRef.current?.querySelector('.specialties-grid') as HTMLElement
      if (cards?.length && cardsWrap) {
        fadeUp(cards, cardsWrap, { stagger: 0.1, start: 'top 80%' })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="specialties"
      style={{
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-fg)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--color-fg)',
            margin: '0 0 24px 0',
          }}
        >
          {t(spec.titleEs, spec.titleEn)}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            color: 'var(--color-muted-fg)',
            maxWidth: 800,
            lineHeight: 1.6,
            marginBottom: 'clamp(60px, 8vw, 100px)',
          }}
        >
          {t(spec.subtitleEs, spec.subtitleEn)}
        </p>

        <div
          className="specialties-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
          }}
        >
          {spec.items.map((item) => (
            <div
              key={item.id}
              className="specialty-card"
              style={{
                backgroundColor: 'var(--color-surface)',
                padding: '40px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)',
                opacity: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                {item.id}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--color-fg)',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                }}
              >
                {lang === 'ES' ? item.title.es : item.title.en}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  color: 'var(--color-muted-fg)',
                  lineHeight: 1.6,
                }}
              >
                {lang === 'ES' ? item.desc.es : item.desc.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
