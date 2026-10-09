import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }

export const EASE_OUT = 'power4.out'
export const EASE_INOUT = 'power4.inOut'
export const DUR_SLOW = 1.4
export const DUR_MED = 0.9

export function revealClip(
  wrapEl: Element,
  imgEl: Element,
  trigger: Element,
  delay = 0
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  tl.fromTo(
    wrapEl,
    { clipPath: 'inset(100% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', duration: DUR_SLOW, ease: EASE_OUT, delay }
  ).fromTo(
    imgEl,
    { scale: 1.15 },
    { scale: 1, duration: DUR_SLOW + 0.4, ease: EASE_OUT },
    '<'
  )

  return tl
}

export function fadeUp(
  targets: Element | Element[] | NodeListOf<Element>,
  trigger: Element,
  { delay = 0, stagger = 0, start = 'top 82%' } = {}
) {
  return gsap.fromTo(
    targets,
    { y: 36, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: DUR_MED,
      ease: EASE_OUT,
      delay,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    }
  )
}

export function parallaxEl(imgEl: Element, trigger: Element, amount = 10) {
  return gsap.fromTo(
    imgEl,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}
