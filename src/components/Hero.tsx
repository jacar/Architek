import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'
import { useEdit } from '../context/EditContext'
import { useTheme } from '../context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

interface HeroSlideProps {
  isDark: boolean
  t: (es: string, en: string) => string
  content: ReturnType<typeof useEdit>['content']['hero']
}

function HeroSlide({ isDark, t, content }: HeroSlideProps) {
  const activeTagline = t(content.taglineEs, content.taglineEn)
  const bgUrl = isDark ? content.bgUrlDark : content.bgUrlLight

  // Explicit, high-contrast palette locked to each slide background
  const bgColor = isDark ? '#0A0A0A' : '#F5F5F0'
  const textColor = isDark ? '#FFFFFF' : '#0A0A0A'
  const subtextColor = isDark ? 'rgba(255, 255, 255, 0.85)' : '#444444'
  const labelColor = isDark ? 'rgba(255, 255, 255, 0.7)' : '#555555'
  const accentHighlight = isDark ? '#C9A050' : 'var(--color-accent)'
  const dividerAccent = isDark ? '#C9A050' : 'var(--color-accent)'

  const gradient = isDark
    ? 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.2) 100%)'
    : 'linear-gradient(to right, rgba(245,245,240,0.95) 0%, rgba(245,245,240,0.7) 50%, rgba(245,245,240,0.2) 100%)'

  return (
    <div
      style={{
        backgroundColor: bgColor,
        backgroundImage: `${gradient}, url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        color: textColor,
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
        padding: 'clamp(24px, 5vw, 60px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1 }} /> {/* Top Spacer */}

      {/* Main Content Group */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        
        {/* Top Label */}
        <div
          className="hero-intro-text"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontWeight: 600,
            color: labelColor,
          }}
        >
          ARCHTEK STUDIO
          <span style={{ width: '40px', height: '1px', backgroundColor: dividerAccent }} />
        </div>

        {/* Huge Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, min(8vw, 15vh), 160px)',
            fontWeight: 700,
            lineHeight: 1.05,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            color: textColor,
          }}
        >
          {activeTagline.split('\n').map((line, lineIdx) => (
            <div
              key={lineIdx}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.2em',
                justifyContent: 'flex-start',
                color: lineIdx === 1 ? accentHighlight : textColor,
              }}
            >
              {line.split(' ').map((word, wordIdx) => (
                <span key={wordIdx} style={{ display: 'inline-flex' }}>
                  {word.split('').map((letter, letterIdx) => (
                    <span
                      key={letterIdx}
                      className="hero-logo-letter"
                      data-char={letter}
                      style={{
                        display: 'inline-block',
                        minWidth: letter === ' ' ? '0.25em' : 'auto',
                        color: 'inherit',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          ))}
        </h1>

        {/* Subtitle & Golden Line */}
        <div style={{ marginTop: 'clamp(2rem, 4vw, 4rem)' }}>
          <div
            className="hero-intro-text"
            style={{
              maxWidth: 'clamp(280px, 38.2vw, 600px)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(14px, 1.2vw, 18px)',
              fontWeight: 500,
              lineHeight: 1.618,
              letterSpacing: '0.01em',
              marginBottom: '1.5rem',
              color: subtextColor,
            }}
          >
            {t(content.subEs, content.subEn)}
          </div>
          <div className="hero-intro-text" style={{ width: '40px', height: '2px', backgroundColor: dividerAccent }} />
        </div>
      </div>

      <div style={{ flex: 1 }} /> {/* Bottom Spacer */}

      {/* Scroll Text - Bottom Right */}
      <div
        className="hero-intro-text"
        style={{
          position: 'absolute',
          bottom: 'clamp(24px, 5vw, 60px)',
          right: 'clamp(24px, 5vw, 60px)',
          fontSize: '13px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textAlign: 'right',
          color: labelColor,
        }}
      >
        <a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>
          {t(content.scrollTextEs, content.scrollTextEn)}
        </a>
      </div>
    </div>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const revealLayerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const { content } = useEdit()
  const { theme } = useTheme()

  const isCurrentDark = theme === 'dark'

  useEffect(() => {
    // 1. Custom Stopwatch / Scramble Effect on visible letters
    const letters = sectionRef.current?.querySelectorAll('.hero-logo-letter')
    const chars = '0123456789'

    if (letters) {
      letters.forEach((el, i) => {
        const htmlEl = el as HTMLElement
        const targetChar = htmlEl.getAttribute('data-char') || ''
        if (targetChar === ' ') return

        const delay = (i % 20) * 35
        const scrambleDuration = 550

        setTimeout(() => {
          const interval = setInterval(() => {
            htmlEl.innerText = chars[Math.floor(Math.random() * chars.length)]
          }, 30)

          setTimeout(() => {
            clearInterval(interval)
            htmlEl.innerText = targetChar
          }, scrambleDuration)
        }, delay)
      })
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Text elements entrance
      tl.fromTo(
        '.hero-intro-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
        '+=0.4'
      )

      // Parallax Invert Scroll Animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        animation: gsap.fromTo(
          revealLayerRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', ease: 'none' }
        ),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [t, theme])

  return (
    <section ref={sectionRef} id="home" style={{ height: '200vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        
        {/* Layer 1: Base Slide matches current theme */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <HeroSlide isDark={isCurrentDark} t={t} content={content.hero} />
        </div>

        {/* Layer 2: Inverted Slide revealed on scroll */}
        <div
          ref={revealLayerRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            clipPath: 'inset(100% 0 0 0)',
          }}
        >
          <HeroSlide isDark={!isCurrentDark} t={t} content={content.hero} />
        </div>

      </div>
    </section>
  )
}
