// app/context/CursorContext.tsx

'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';

// Definimos la forma que tendrá nuestro contexto
interface CursorContextType {
  isSpotlight: boolean;
  setIsSpotlight: (value: boolean) => void;
  enableCustomCursor: boolean;
  setEnableCustomCursor: (value: boolean) => void;
}

// Creamos el Context con un valor por defecto
const CursorContext = createContext<CursorContextType | undefined>(undefined);

// Creamos un "Proveedor" que envolverá nuestra aplicación
export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [isSpotlight, setIsSpotlight] = useState(false);
  const [enableCustomCursor, setEnableCustomCursor] = useState(true);

  // Detectar dispositivos táctiles donde no queremos cursor personalizado
  useEffect(() => {
    const isTouchDevice = () => {
      return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    };

    if (isTouchDevice()) {
      setEnableCustomCursor(false);
    }
  }, []);

  return (
    <CursorContext.Provider value={{ 
      isSpotlight, 
      setIsSpotlight,
      enableCustomCursor,
      setEnableCustomCursor 
    }}>
      {children}
      {enableCustomCursor && <CustomCursor />}
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