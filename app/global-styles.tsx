// app/global-styles.tsx

'use client'; // Marcamos este componente como de Cliente

import React from 'react';

// Este componente no renderizará nada visible, solo la etiqueta de estilos.
const GlobalStyles = () => {
  return (
    // Aquí dentro pega los estilos que tenías en tu layout.tsx
    // He puesto un ejemplo, reemplázalo con los tuyos.
    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #0a0a0a; /* Ejemplo */
        color: #ffffff; /* Ejemplo */
      }

      a {
        color: inherit;
        text-decoration: none;
      }
    `}</style>
  );
};

export default GlobalStyles;