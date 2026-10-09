import { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from './lib/animations'
import Lenis from 'lenis'
import { CustomCursor } from './components/CustomCursor'
import { Navigation } from './components/Navigation'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectList } from './components/ProjectList'
import { Gallery } from './components/Gallery'
import { About } from './components/About'
import { Specialties } from './components/Specialties'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SplashIntro } from './components/SplashIntro'
import { ThemeToggle } from './components/ThemeToggle'
import { Process } from './components/Process'
import { Brands } from './components/Brands'
import { BackToTop } from './components/BackToTop'
import { EditorSidebar } from './components/EditorSidebar'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [introFinished, setIntroFinished] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'gallery'>('home')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  // Called when splash intro animation completes
  const handleIntroFinished = () => {
    // Force scroll to absolute top before revealing content
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    setIntroFinished(true)
  }

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  // Optimize GSAP ScrollTrigger performance on view toggle
  useEffect(() => {
    if (!introFinished) return

    if (currentView === 'gallery') {
      // Disable background triggers on hidden home sections to save CPU/GPU cycles
      ScrollTrigger.getAll().forEach((t) => t.disable(false))
    } else {
      // Re-enable and recalculate triggers on home view
      ScrollTrigger.getAll().forEach((t) => t.enable(false))
      const id = setTimeout(() => ScrollTrigger.refresh(), 100)
      return () => clearTimeout(id)
    }
  }, [introFinished, currentView])

  // Cleanup all triggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const handleNavigateHome = (sectionId?: string) => {
    setCurrentView('home')
    setSelectedProjectId(null)
    
    // Reset scroll with Lenis and native window
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)

    setTimeout(() => {
      ScrollTrigger.refresh()
      if (sectionId) {
        const el = document.querySelector(sectionId)
        if (el && lenisRef.current) {
          lenisRef.current.scrollTo(el as HTMLElement)
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }, 100)
  }

  const handleNavigateGallery = (projectId?: string) => {
    setSelectedProjectId(projectId || null)
    setCurrentView('gallery')

    // Reset scroll with Lenis and native window
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)
  }

  return (
    <>
      {/* Editor Sidebar */}
      <EditorSidebar />

      {!introFinished && (
        <SplashIntro onEnter={handleIntroFinished} />
      )}

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Full-screen navigation overlay */}
      <Navigation
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigateHome={handleNavigateHome}
        onNavigateGallery={handleNavigateGallery}
      />

      {/* Fixed header */}
      <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((v) => !v)} onLogoClick={() => handleNavigateHome()} />

      {/* Floating Theme Toggle */}
      <ThemeToggle />

      {/* Floating Back to Top */}
      {introFinished && <BackToTop />}

      {/* Main Content View Router */}
      <main id="main-content" style={{ opacity: introFinished ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        {/* Home Sections Container */}
        <div style={{ display: currentView === 'home' ? 'block' : 'none' }}>
          <Hero />
          <ProjectList onViewGallery={handleNavigateGallery} />
          <About />
          <Specialties />
          <Process />
          <Brands />
          <Contact />
        </div>

        {/* Gallery View Container */}
        {currentView === 'gallery' && (
          <Gallery
            onBackToHome={() => handleNavigateHome()}
            initialProjectId={selectedProjectId}
          />
        )}
      </main>

      {introFinished && <Footer />}
    </>
  )
}
