import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { PatientsProvider } from './contexts/PatientsContext' 
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <App />
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
