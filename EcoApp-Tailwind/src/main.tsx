import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Asegúrate de que Tailwind esté importado aquí
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // Importar el ThemeProvider

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider> {/* Envolvemos App con ThemeProvider */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
