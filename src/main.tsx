import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PokemonTeamProvider } from './contexts/PokemonTeamContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PokemonTeamProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PokemonTeamProvider>
    </ThemeProvider>
  </StrictMode>,
)
