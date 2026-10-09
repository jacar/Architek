import { useEffect, useState } from 'react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: 'clamp(20px, 4vw, 40px)',
        right: 'clamp(20px, 4vw, 40px)',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-fg)',
        color: 'var(--color-bg)',
        border: '1px solid rgba(128,128,128,0.2)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 90,
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      }}
      aria-label="Volver al inicio"
      className="back-to-top-btn"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'transform 0.3s ease' }}
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      <style>{`
        .back-to-top-btn:hover {
          transform: translateY(-5px) scale(1.05) !important;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important;
        }
        .back-to-top-btn:hover svg {
          transform: translateY(-3px);
        }
      `}</style>
    </button>
  )
}
