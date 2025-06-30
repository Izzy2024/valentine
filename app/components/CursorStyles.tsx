// ./app/components/CursorStyles.tsx

'use client'; // Marcamos este componente como de Cliente

import React from 'react';

// Este componente solo inyecta los estilos CSS para ocultar el cursor por defecto.
const CursorStyles = () => {
  return (
    <style jsx global>{`
      body, a, button {
        cursor: none !important; /* Asegura que el cursor por defecto esté oculto */
      }
    `}</style>
  );
};

export default CursorStyles;