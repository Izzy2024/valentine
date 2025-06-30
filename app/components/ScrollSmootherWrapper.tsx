"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), { ssr: false });

interface ScrollSmootherWrapperProps {
  children: React.ReactNode;
}

const ScrollSmootherWrapper: React.FC<ScrollSmootherWrapperProps> = ({ children }) => {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Registrar los plugins de GSAP
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      
      // Crear el ScrollSmoother
      let smoother: any;
      
      try {
        smoother = ScrollSmoother.create({
          wrapper: smoothWrapperRef.current,
          content: smoothContentRef.current,
          smooth: 1.5, // Ajusta la suavidad del scroll (1 = normal, 2 = medio, 3 = suave)
          effects: true, // Habilita efectos de velocidad en elementos con data-speed
          normalizeScroll: true, // Normaliza el comportamiento del scroll en diferentes navegadores
          ignoreMobileResize: true, // Evita problemas en redimensionamiento en móviles
        });
      } catch (error) {
        console.error("Error initializing ScrollSmoother:", error);
      }

      // Limpieza al desmontar
      return () => {
        if (smoother) {
          smoother.kill();
        }
      };
    }
  }, []);

  return (
    <div ref={smoothWrapperRef} className="smooth-wrapper">
      <div ref={smoothContentRef} className="smooth-content">
        <AnimatedBackground /> {/* Render AnimatedBackground here */}
        {children}
      </div>
    </div>
  );
};

export default ScrollSmootherWrapper;