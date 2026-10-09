import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { gsap } from '../lib/animations'

export type Theme = 'dark' | 'light'
export type ThemeSource = 'auto' | 'manual'

interface ThemeContextType {
  theme: Theme
  themeSource: ThemeSource
  isAutoMode: boolean
  toggleTheme: () => void
  setTheme: (t: Theme) => void
  enableAutoMode: () => void
}

// ─── Automatic Day/Night & Device System Detection ───────────────────────────
// Day:   06:00 – 17:59  →  light ("Live Mode": #F9F9F7)
// Night: 18:00 – 05:59  →  dark ("Dark Mode": #0A0A0A)
const DAY_START = 6   // 06:00
const DAY_END   = 18  // 18:00

function detectAutoTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const hour = new Date().getHours()
  // Día: 06:00 – 17:59 (6 AM a 6 PM) → 'light' (Modo Live)
  // Noche: 18:00 – 05:59 (6 PM a 6 AM) → 'dark' (Modo Noche)
  const isNightByTime = hour < DAY_START || hour >= DAY_END

  return isNightByTime ? 'dark' : 'light'
}

const STORAGE_KEY = 'archtek-theme'
const SOURCE_KEY  = 'archtek-theme-source'

// ─── Context ─────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start in auto mode — detect day/night from device
  const [themeSource, setThemeSource] = useState<ThemeSource>('auto')

  const [theme, setThemeState] = useState<Theme>(() => {
    return detectAutoTheme()
  })

  // ── Apply CSS variables strictly matching brand guidelines ────────────────
  const applyCssVars = useCallback((t: Theme, animate = true) => {
    const isDark = t === 'dark'
    const vars = {
      '--color-bg':       isDark ? '#0A0A0A' : '#F9F9F7',
      '--color-fg':       isDark ? '#FFFFFF' : '#0A0A0A',
      '--color-accent':   '#4A5240', // Olive Green accent
      '--color-muted-fg': '#888888', // Secondary Grey text
      '--color-surface':  isDark ? '#111111' : '#EAEAE5',
      '--color-border':   isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    }
    if (animate) {
      gsap.to(document.documentElement, { ...vars, duration: 0.5, ease: 'power2.inOut' })
    } else {
      gsap.set(document.documentElement, vars)
    }
  }, [])

  // ── Core theme setter ────────────────────────────────────────────────────
  const applyTheme = useCallback((newTheme: Theme, source: ThemeSource, animate = true) => {
    setThemeState(newTheme)
    setThemeSource(source)
    document.documentElement.setAttribute('data-theme', newTheme)
    document.documentElement.setAttribute('data-theme-source', source)
    localStorage.setItem(STORAGE_KEY, newTheme)
    localStorage.setItem(SOURCE_KEY, source)
    applyCssVars(newTheme, animate)
  }, [applyCssVars])

  // ── Init theme on mount ──────────────────────────────────────────────────
  useEffect(() => {
    const initial = detectAutoTheme()
    applyTheme(initial, 'auto', false)
  }, [])

  // ── Automatic Day/Night Listener ─────────────────────────────────────────
  useEffect(() => {
    if (themeSource !== 'auto') return

    const checkAuto = () => {
      const currentAuto = detectAutoTheme()
      if (currentAuto !== theme) {
        applyTheme(currentAuto, 'auto', true)
      }
    }

    const intervalId = setInterval(checkAuto, 30_000)
    return () => clearInterval(intervalId)
  }, [themeSource, theme, applyTheme])

  // ── Public API ───────────────────────────────────────────────────────────
  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next, 'manual', true)
  }

  const setTheme = (t: Theme) => {
    applyTheme(t, 'manual', true)
  }

  const enableAutoMode = () => {
    const auto = detectAutoTheme()
    applyTheme(auto, 'auto', true)
  }

  return (
    <ThemeContext.Provider value={{ theme, themeSource, isAutoMode: themeSource === 'auto', toggleTheme, setTheme, enableAutoMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
