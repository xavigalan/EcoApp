import React, { useState, useEffect } from 'react';

const FontSizeAdjuster: React.FC = () => {
  // Usamos useState para mantener el tamaño de la fuente actual
  const [fontSize, setFontSize] = useState<number>(16); // Valor inicial de tamaño de fuente

  // Al cargar, obtenemos el tamaño guardado desde localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
  }, []);

  // Función para aumentar el tamaño de la fuente
  const increaseFontSize = () => {
    const newSize = fontSize * 1.1;
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
  };

  // Función para disminuir el tamaño de la fuente
  const decreaseFontSize = () => {
    const newSize = fontSize / 1.1;
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize.toString());
  };

  // Establecer el tamaño de la fuente en el body del documento
  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <button onClick={increaseFontSize} style={buttonStyle}>+</button>
      <button onClick={decreaseFontSize} style={buttonStyle}>-</button>
    </div>
  );
};

// Estilos simples para los botones
const buttonStyle = {
  fontSize: '20px',
  padding: '10px',
  margin: '5px',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
};

export default FontSizeAdjuster;
