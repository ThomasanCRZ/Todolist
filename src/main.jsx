import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import App from './App.jsx'
import Todolist from './pages/Todolist.jsx'
import Auth from './components/Auth.jsx'
import Register from './components/Register.jsx'
import './styles/index.scss'

// Composant pour gérer les routes avec animation
const AnimatedRoutes = () => {
  const location = useLocation(); // Permet d'écouter le changement de page

  return (
    <AnimatePresence mode="wait"> {/* Attends la fin de l'animation avant de changer */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="/todolist" element={<Todolist />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  </StrictMode>,
)
