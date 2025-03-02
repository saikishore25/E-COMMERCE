import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './contexts/adminContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>

  <BrowserRouter>
    
    <AdminContextProvider>

      <App />

    </AdminContextProvider>
  
  </BrowserRouter>
  // </StrictMode>,
)
