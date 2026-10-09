import { useEffect, useRef } from 'react'
import { gsap, fadeUp } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'
import { useEdit } from '../context/EditContext'

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const { lang, t } = useLanguage()
  const { content } = useEdit()
  const proc = content.process

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>('.process-item')
      const wrap = sectionRef.current?.querySelector('.process-list') as HTMLElement
      if (items?.length && wrap) {
        fadeUp(items, wrap, { stagger: 0.15, start: 'top 85%' })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-fg)',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
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
          {t(proc.titleEs, proc.titleEn)}
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
          {t(proc.subtitleEs, proc.subtitleEn)}
        </p>

        <div className="process-list" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {proc.steps.map((step) => (
            <div
              key={step.id}
              className="process-item"
              style={{
                display: 'flex',
                gap: '30px',
                paddingBottom: '40px',
                borderBottom: '1px solid color-mix(in srgb, var(--color-fg) 10%, transparent)',
                opacity: 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {step.id}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2vw, 28px)',
                    fontWeight: 600,
                    color: 'var(--color-fg)',
                    marginBottom: '16px',
                  }}
                >
                  {lang === 'ES' ? step.title.es : step.title.en}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    color: 'var(--color-muted-fg)',
                    lineHeight: 1.6,
                    maxWidth: 700,
                  }}
                >
                  {lang === 'ES' ? step.desc.es : step.desc.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
