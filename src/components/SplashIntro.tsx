import { useRef, useEffect } from 'react'
import { gsap } from '../lib/animations'

interface SplashIntroProps {
  onEnter: () => void
}

export function SplashIntro({ onEnter }: SplashIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = 'hidden'

    // The counter object for GSAP to animate
    const progress = { value: 0 }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
          onEnter()
        }
      })

      // 1. The Dimmer: Count from 0 to 100
      tl.to(progress, {
        value: 100,
        duration: 2,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = `${Math.round(progress.value)}%`
          }
          // Slight background glow as dimmer goes up
          const lightness = 5 + (progress.value / 100) * 10 // 5% to 15% lightness
          if (containerRef.current) {
            containerRef.current.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`
          }
        }
      })

      // 2. Hide counter
      tl.to(counterRef.current, {
        opacity: 0,
        duration: 0.2,
      }, "+=0.1")

      // 3. The Spark: Tiny dot appears
      tl.set(dotRef.current, { opacity: 1, scale: 0 })
      tl.to(dotRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'back.out(2)'
      })

      // 4. The Switch: White flash expanding
      tl.to(dotRef.current, {
        scale: 200, // Expand to cover screen
        duration: 0.5,
        ease: 'power4.in',
        backgroundColor: '#FFFFFF',
      }, "+=0.2")

      // Match container to the white flash so the dot can disappear
      tl.set(containerRef.current, { backgroundColor: '#FFFFFF' })
      tl.set(dotRef.current, { opacity: 0 })

      // 5. Reveal Logo in negative space
      tl.fromTo(logoRef.current, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      })

      // Hold the logo
      tl.to({}, { duration: 0.8 })

      // 6. Dissolve to the site
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      })

    }, containerRef)

    return () => ctx.revert()
  }, [onEnter])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999, // Above everything
        backgroundColor: 'hsl(0, 0%, 5%)', // Very dark gray starting point
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Percentage Counter */}
      <div
        ref={counterRef}
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          color: '#FFFFFF',
          opacity: 0.7,
        }}
      >
        0%
      </div>

      {/* The Spark / Light Bulb */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          opacity: 0,
          boxShadow: '0 0 20px 5px rgba(255,255,255,0.8)',
        }}
      />

      {/* The Logo */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 4vw, 48px)',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#0A0A0A', // Dark text on the white flash
          textTransform: 'uppercase',
          opacity: 0,
        }}
      >
        ARCHTEK STUDIO
      </div>
    </div>
  )
}
