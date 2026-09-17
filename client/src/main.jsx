import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import "bootstrap/dist/js/bootstrap.bundle.min"
import { BrowserRouter } from 'react-router-dom'
import Auth from './context/AuthContext.jsx'
import AppContext from './context/AppContext.jsx'
import { HelmetProvider } from 'react-helmet-async';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppContext>
    <Auth>
      <HelmetProvider>
    <App />
      </HelmetProvider>
    </Auth>
    </AppContext>
    </BrowserRouter>
  </StrictMode>,
)
