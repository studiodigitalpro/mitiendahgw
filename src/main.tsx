import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Redirección e inicialización segura para todas las URLs antiguas
try {
  if (typeof window !== 'undefined' && window.location.pathname !== '/') {
    const search = window.location.search || '';
    const hash = window.location.hash || '';
    window.history.replaceState(null, '', `/${search}${hash}`);
  }
} catch (e) {
  // Manejo a prueba de errores para navegadores móviles con restricciones de sandbox
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

