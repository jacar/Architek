import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const outer = outerRef.current
    const inner = innerRef.current
    const label = labelRef.current
    if (!outer || !inner || !label) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let outerX = mouseX
    let outerY = mouseY
    let innerX = mouseX
    let innerY = mouseY
    let currentState = 'default'

    gsap.set([outer, inner], { x: mouseX, y: mouseY, xPercent: -50, yPercent: -50, opacity: 0 })

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onEnter = () => gsap.to([outer, inner], { opacity: 1, duration: 0.3 })
    const onLeave = () => gsap.to([outer, inner], { opacity: 0, duration: 0.3 })

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null
      const newState = el?.getAttribute('data-cursor') ?? 'default'
      if (newState === currentState) return
      currentState = newState

      if (newState === 'project') {
        gsap.to(outer, { width: 88, height: 88, duration: 0.45, ease: 'power2.out', backgroundColor: 'transparent', borderColor: 'rgba(240,236,230,0.5)' })
        gsap.to(inner, { opacity: 0, duration: 0.2 })
        gsap.to(label, { opacity: 1, duration: 0.25 })
      } else if (newState === 'link') {
        gsap.to(outer, { width: 44, height: 44, duration: 0.4, ease: 'power2.out', backgroundColor: 'transparent', borderColor: 'rgba(240,236,230,0.4)' })
        gsap.to(inner, { opacity: 0, duration: 0.2 })
        gsap.to(label, { opacity: 0, duration: 0.15 })
      } else {
        gsap.to(outer, { width: 12, height: 12, duration: 0.4, ease: 'power2.out', backgroundColor: '#f0ece6', borderColor: 'transparent' })
        gsap.to(inner, { opacity: 1, duration: 0.2 })
        gsap.to(label, { opacity: 0, duration: 0.15 })
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver)

    const tickerFn = () => {
      outerX += (mouseX - outerX) * 0.09
      outerY += (mouseY - outerY) * 0.09
      innerX += (mouseX - innerX) * 0.25
      innerY += (mouseY - innerY) * 0.25
      gsap.set(outer, { x: outerX, y: outerY })
      gsap.set(inner, { x: innerX, y: innerY })
    }

    gsap.ticker.add(tickerFn)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  return (
    <>
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#f0ece6',
          border: '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 9,
            letterSpacing: '0.2em',
            color: '#f0ece6',
            textTransform: 'uppercase',
            opacity: 0,
            userSelect: 'none',
          }}
        >
          VIEW
        </span>
      </div>

      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: '#c4aa88',
          pointerEvents: 'none',
          zIndex: 100000,
          willChange: 'transform',
        }}
      />
    </>
  )
}
