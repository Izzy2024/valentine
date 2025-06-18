"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Initial position off-screen
  const [isHoveringLinkOrButton, setIsHoveringLinkOrButton] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if ((e.target instanceof HTMLAnchorElement) || (e.target instanceof HTMLButtonElement)) {
        setIsHoveringLinkOrButton(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if ((e.target instanceof HTMLAnchorElement) || (e.target instanceof HTMLButtonElement)) {
        setIsHoveringLinkOrButton(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseEnter, true); // Use capture phase
    document.addEventListener('mouseout', handleMouseLeave, true); // Use capture phase


    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseEnter, true);
      document.removeEventListener('mouseout', handleMouseLeave, true);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 8, // Center the 16x16 cursor
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: 'rgba(29, 78, 216, 0.8)', // blue-700 with opacity
      borderRadius: '50%',
      transition: { type: 'spring', stiffness: 500, damping: 30, mass: 0.1 }
    },
    linkHover: {
      x: mousePosition.x - 16, // Center the 32x32 cursor
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
      borderRadius: '50%',
      mixBlendMode: 'difference',
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.div
      variants={cursorVariants}
      animate={isHoveringLinkOrButton ? "linkHover" : "default"}
      className="fixed top-0 left-0 z-[9999] pointer-events-none" // Ensure it's above everything and doesn't interfere with clicks
    />
  );
};

export default CustomCursor;
