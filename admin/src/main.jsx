import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import { BrowserRouter } from 'react-router-dom'
import  AuthContext from './context/AuthContext.jsx'
import AppContext from './context/AppContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppContext>
    <AuthContext>
    <App />
    </AuthContext>
    </AppContext>
    </BrowserRouter>
  </StrictMode>,
)
