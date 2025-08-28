// app/context/CursorContext.tsx

'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definimos la forma que tendrá nuestro contexto
interface CursorContextType {
  isSpotlight: boolean;
  setIsSpotlight: (value: boolean) => void;
}

// Creamos el Context con un valor por defecto
const CursorContext = createContext<CursorContextType | undefined>(undefined);

// Creamos un "Proveedor" que envolverá nuestra aplicación
export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [isSpotlight, setIsSpotlight] = useState(false);

  return (
    <CursorContext.Provider value={{ isSpotlight, setIsSpotlight }}>
      {children}
    </CursorContext.Provider>
  );
};

// Creamos un hook personalizado para usar el contexto fácilmente
export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};