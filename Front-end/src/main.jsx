import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
//import Form from '../components/Login.jsx'
//import Dashboard from './Dashboard.jsx'
import App from './App.jsx'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
