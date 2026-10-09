import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './context/LanguageContext'
import { EditProvider } from './context/EditContext'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <EditProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </EditProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
