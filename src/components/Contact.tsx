import React, { useState, useEffect, useRef } from 'react'
import { gsap, fadeUp } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'
import { useEdit } from '../context/EditContext'

interface FormData {
  name: string
  email: string
  country: string
  city: string
  projectType: string
  message: string
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { t } = useLanguage()
  const { content } = useEdit()
  const contact = content.contact

  const email = contact.email || 'Sebastian@archtekstudio.com'
  const instagramUrl = contact.social?.instagram || 'https://www.instagram.com/archtekstudio'
  const tiktokUrl = contact.social?.tiktok || 'https://www.tiktok.com/@archtekstudio'

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    country: '',
    city: '',
    projectType: 'residential',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerEl = sectionRef.current?.querySelector('.contact-header') as HTMLElement
      if (headerEl) fadeUp(headerEl, headerEl, { delay: 0.1 })

      const formBox = sectionRef.current?.querySelector('.contact-form-box') as HTMLElement
      if (formBox) fadeUp(formBox, formBox, { delay: 0.25 })

      const directBox = sectionRef.current?.querySelector('.contact-direct-box') as HTMLElement
      if (directBox) fadeUp(directBox, directBox, { delay: 0.35 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Construct mailto link for direct sending
    const subject = encodeURIComponent(`Nuevo proyecto: ${formData.projectType} - ${formData.name}`)
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `País: ${formData.country}\n` +
      `Ciudad: ${formData.city}\n` +
      `Tipo de proyecto: ${formData.projectType}\n\n` +
      `Mensaje:\n${formData.message}`
    )

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank')
    }, 700)
  }

  const projectTypes = [
    { id: 'residential', es: 'Residencial', en: 'Residential' },
    { id: 'commercial', es: 'Comercial', en: 'Commercial' },
    { id: 'hospitality', es: 'Hotelero', en: 'Hospitality' },
    { id: 'other', es: 'Otro', en: 'Other' },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contacto"
      style={{
        padding: 'clamp(80px, 10vw, 150px) clamp(24px, 5vw, 80px)',
        borderTop: '1px solid var(--color-border)',
        position: 'relative',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Section Header */}
        <div className="contact-header" style={{ marginBottom: 'clamp(48px, 6vw, 80px)', textAlign: 'left' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            04 / {t('Contacto', 'Contact')}
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--color-fg)',
              letterSpacing: '-0.02em',
              marginBottom: 20,
              maxWidth: 800,
            }}
          >
            {t(contact.titleEs, contact.titleEn)}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.6,
              color: 'var(--color-muted-fg)',
              maxWidth: 720,
            }}
          >
            {t(contact.introEs, contact.introEn)}
          </p>
        </div>

        {/* Content Layout: Form + Direct Contact Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Form */}
          <div className="contact-form-box">
            {submitted ? (
              <div
                style={{
                  padding: '48px 32px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 12,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--color-fg)',
                    marginBottom: 12,
                  }}
                >
                  {t('¡Mensaje enviado con éxito!', 'Message sent successfully!')}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    color: 'var(--color-muted-fg)',
                    lineHeight: 1.5,
                    marginBottom: 24,
                  }}
                >
                  {t(
                    'Gracias por contactarnos. Nos pondremos en contacto contigo a la mayor brevedad posible.',
                    'Thank you for reaching out. We will get back to you as soon as possible.'
                  )}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', country: '', city: '', projectType: 'residential', message: '' })
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--color-muted-fg)',
                    color: 'var(--color-fg)',
                    borderRadius: 6,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  {t('Enviar otro mensaje', 'Send another message')}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Row 1: Nombre & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={formLabelStyle}>
                      {t('Nombre', 'Name')} <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('Tu nombre completo', 'Your full name')}
                      style={formInputStyle}
                    />
                  </div>
                  <div>
                    <label style={formLabelStyle}>
                      {t('Correo electrónico', 'Email')} <span style={{ color: 'var(--color-accent)' }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('tucorreo@ejemplo.com', 'youremail@example.com')}
                      style={formInputStyle}
                    />
                  </div>
                </div>

                {/* Row 2: País & Ciudad */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={formLabelStyle}>{t('País', 'Country')}</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder={t('Ej. Colombia, EE.UU.', 'e.g. USA, Colombia')}
                      style={formInputStyle}
                    />
                  </div>
                  <div>
                    <label style={formLabelStyle}>{t('Ciudad', 'City')}</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder={t('Ej. Medellín, Miami', 'e.g. Miami, Medellin')}
                      style={formInputStyle}
                    />
                  </div>
                </div>

                {/* Row 3: Tipo de proyecto */}
                <div>
                  <label style={formLabelStyle}>
                    {t('Tipo de proyecto', 'Project type')}
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8 }}>
                    {projectTypes.map((pt) => {
                      const isSelected = formData.projectType === pt.id
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: pt.id })}
                          style={{
                            padding: '10px 14px',
                            backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-surface)',
                            border: `1px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                            color: isSelected ? '#FFFFFF' : 'var(--color-fg)',
                            borderRadius: 6,
                            fontFamily: 'var(--font-sans)',
                            fontSize: 13,
                            fontWeight: isSelected ? 600 : 400,
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {t(pt.es, pt.en)}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Row 4: Mensaje */}
                <div>
                  <label style={formLabelStyle}>
                    {t('Cuéntanos sobre tu proyecto', 'Tell us about your project')} <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t(
                      'Detalles del espacio, metraje, etapa actual, requerimientos...',
                      'Space details, square footage, current stage, requirements...'
                    )}
                    style={{ ...formInputStyle, resize: 'vertical' }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="link"
                  style={{
                    padding: '16px 28px',
                    backgroundColor: 'var(--color-accent)',
                    border: 'none',
                    borderRadius: 6,
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    marginTop: 8,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#58614d'
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(74, 82, 64, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'
                  }}
                >
                  {isSubmitting ? (
                    t('Enviando...', 'Sending...')
                  ) : (
                    <>
                      {t('Enviar mensaje', 'Send message')}
                      <span style={{ fontSize: 16 }}>→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info Card */}
          <div
            className="contact-direct-box"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 12,
              padding: 'clamp(28px, 4vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {t('Contacto Directo', 'Direct Contact')}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2vw, 24px)',
                  fontWeight: 700,
                  color: 'var(--color-fg)',
                }}
              >
                Archtek Studio
              </h3>
            </div>

            {/* Email item */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 18 }}>
              <span style={directLabelStyle}>{t('Correo electrónico', 'Email')}</span>
              <a
                href={`mailto:${email}`}
                data-cursor="link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  color: 'var(--color-fg)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  marginTop: 6,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {email}
              </a>
            </div>

            {/* Location item */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 18 }}>
              <span style={directLabelStyle}>{t('Presencia Internacional', 'International Presence')}</span>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  color: 'var(--color-fg)',
                  fontWeight: 500,
                  marginTop: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {contact.location}
              </p>
            </div>

            {/* Social channels item */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 18 }}>
              <span style={directLabelStyle}>{t('Redes Sociales', 'Social Channels')}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  style={socialLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Instagram: <strong>@archtekstudio</strong></span>
                </a>

                {/* TikTok */}
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  style={socialLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                  <span>TikTok: <strong>@archtekstudio</strong></span>
                </a>
              </div>
            </div>

            {/* Availability Pill */}
            <div
              style={{
                marginTop: 8,
                padding: '12px 16px',
                borderRadius: 8,
                backgroundColor: 'rgba(74, 82, 64, 0.2)',
                border: '1px solid var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  boxShadow: '0 0 10px #4ade80',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  color: 'var(--color-fg)',
                  fontWeight: 500,
                }}
              >
                {t('Agendando proyectos para este trimestre', 'Scheduling projects for this quarter')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

const formLabelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.04em',
  color: 'var(--color-fg)',
  marginBottom: 8,
}

const formInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  backgroundColor: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 6,
  color: 'var(--color-fg)',
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const directLabelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: 11,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--color-muted-fg)',
  fontWeight: 600,
}

const socialLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  color: 'var(--color-fg)',
  textDecoration: 'none',
  transition: 'color 0.2s',
}
