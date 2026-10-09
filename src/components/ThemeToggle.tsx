import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, isAutoMode, toggleTheme, enableAutoMode } = useTheme()

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {/* Auto-mode indicator badge */}
      <div
        title={isAutoMode ? 'Auto: detectando hora del dispositivo' : 'Modo manual activo'}
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isAutoMode ? '#4ade80' : '#f59e0b',
          boxShadow: isAutoMode
            ? '0 0 6px 2px rgba(74,222,128,0.5)'
            : '0 0 6px 2px rgba(245,158,11,0.5)',
          transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
        }}
      />

      {/* Switch Body */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={theme === 'dark' ? 'Cambiar a modo día (Live)' : 'Cambiar a modo noche (Dark)'}
        style={{
          width: '34px',
          height: '70px',
          backgroundColor: theme === 'dark' ? '#222' : '#ddd',
          borderRadius: '17px',
          border: `1px solid ${theme === 'dark' ? '#444' : '#bbb'}`,
          position: 'relative',
          cursor: 'pointer',
          padding: 0,
          outline: 'none',
          boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.4)',
          transition: 'background-color 0.4s ease',
        }}
      >
        {/* Switch Knob */}
        <div
          style={{
            width: '28px',
            height: '28px',
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
            borderRadius: '50%',
            position: 'absolute',
            left: '2px',
            top: theme === 'dark' ? '2px' : '38px',
            transition: 'top 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), background-color 0.4s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '4px', height: '12px', backgroundColor: theme === 'dark' ? '#555' : '#ccc', borderRadius: '2px' }} />
        </div>
      </button>

      {/* Sun / Moon icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme === 'dark' ? 'var(--color-muted-fg)' : '#EAB308'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: 'stroke 0.4s ease, filter 0.4s ease',
          filter: theme === 'light' ? 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.6))' : 'none',
        }}
      >
        {theme === 'dark' ? (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        )}
      </svg>

      {/* Reset to Auto button — only visible when user is in manual mode */}
      {!isAutoMode && (
        <button
          onClick={enableAutoMode}
          title="Volver a modo automático (hora del dispositivo)"
          aria-label="Activar modo automático"
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '1px solid #f59e0b',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            transition: 'background-color 0.2s ease, transform 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(245,158,11,0.15)'
            ;(e.currentTarget as HTMLButtonElement).style.transform = 'rotate(180deg)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.transform = 'rotate(0deg)'
          }}
        >
          {/* Refresh / auto icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      )}
    </div>
  )
}
