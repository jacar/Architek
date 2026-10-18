import { useLanguage } from '../context/LanguageContext'
import { useEdit } from '../context/EditContext'
import { useTheme } from '../context/ThemeContext'

export function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLanguage()
  const { content } = useEdit()
  const { theme } = useTheme()
  const contact = content.contact

  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const logoDark = `${baseUrl}/images/logo-horizontal-dark.webp`
  const logoLight = `${baseUrl}/images/logo-horizontal-light.webp`

  const instagramUrl = contact.social?.instagram || 'https://www.instagram.com/archtekstudio'
  const tiktokUrl = contact.social?.tiktok || 'https://www.tiktok.com/@archtekstudio'
  const email = contact.email || 'Sebastian@archtekstudio.com'

  return (
    <footer
      style={{
        padding: 'clamp(32px, 5vw, 60px) clamp(24px, 5vw, 80px)',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-fg)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* Top Footer Row: Brand + Direct Email + Social Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {/* Brand Info */}
          <div>
            <img
              src={theme === 'light' ? logoLight : logoDark}
              alt="ARCHTEK STUDIO"
              style={{
                height: 'clamp(20px, 2.2vw, 26px)',
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
                marginBottom: '8px',
                transition: 'opacity 0.25s ease',
              }}
              onError={(e) => {
                const target = e.currentTarget
                const isLight = theme === 'light'
                const fallback = isLight
                  ? `${baseUrl}/images/Logo horizontal negro.png`
                  : `${baseUrl}/images/Logo horizonatl blanco.png`
                if (target.src !== fallback) {
                  target.src = fallback
                }
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--color-muted-fg)',
                margin: '6px 0 0 0',
              }}
            >
              {t('Iluminación, Control & Tecnología', 'Lighting, Control & Technology')} • {contact.location}
            </p>
          </div>

          {/* Social Links with SVG Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {/* Email link */}
            <a
              href={`mailto:${email}`}
              title="Email"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-fg)',
                textDecoration: 'none',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--color-border)',
                padding: '8px 16px',
                borderRadius: '100px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.color = 'var(--color-accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-fg)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{email}</span>
            </a>

            {/* Instagram link */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram @archtekstudio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-fg)',
                textDecoration: 'none',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--color-border)',
                padding: '8px 16px',
                borderRadius: '100px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.color = 'var(--color-accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-fg)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>

            {/* TikTok link */}
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok @archtekstudio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-fg)',
                textDecoration: 'none',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--color-border)',
                padding: '8px 16px',
                borderRadius: '100px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.color = 'var(--color-accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-fg)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Bottom Footer Row: Copyright & Developer Credit */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--color-muted-fg)',
              letterSpacing: '0.05em',
            }}
          >
            © {year} ARCHTEK STUDIO. {t('Todos los derechos reservados.', 'All rights reserved.')}
          </span>

          {/* Focus Creative Credit */}
          <a
            href="https://focuscreative.com.co/"
            target="_blank"
            rel="noopener noreferrer"
            title="Focus Creative"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--color-muted-fg)',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted-fg)')}
          >
            {t('Desarrollado por', 'Developed by')}{' '}
            <strong style={{ color: 'var(--color-fg)', fontWeight: 600 }}>Focus Creative</strong>
          </a>
        </div>
      </div>
    </footer>
  )
}
