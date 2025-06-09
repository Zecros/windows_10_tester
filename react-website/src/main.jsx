import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Using custom CSS instead of index.css with Tailwind directives
import './custom.css'
import App from './App.jsx'
import { ThemeProvider } from './theme/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
