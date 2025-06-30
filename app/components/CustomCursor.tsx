// app/components/CustomCursor.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext'; // 1. Importa el hook del contexto

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // 2. Obtenemos el estado y la función para cambiarlo DESDE EL CONTEXTO
  const { isSpotlight, setIsSpotlight } = useCursor(); 

  // El useState local para isSpotlight ha sido ELIMINADO

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setIsSpotlight(true);
    const handleMouseLeave = () => setIsSpotlight(false);
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [setIsSpotlight]); // Añadimos setIsSpotlight como dependencia

  const cursorVariants = {
    default: {
      x: position.x - 8,
      y: position.y - 8,
      width: 16,
      height: 16,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference' as const,
    },
    spotlight: {
      x: position.x - 32,
      y: position.y - 32,
      width: 64,
      height: 64,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      mixBlendMode: 'difference' as const,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      variants={cursorVariants}
      animate={isSpotlight ? 'spotlight' : 'default'} // Sigue usando el estado del contexto
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  );
};

export default CustomCursor;