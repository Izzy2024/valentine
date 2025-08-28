"use client";

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './components/HeroSection';
import NovedadesSection from './components/NovedadesSection';
import OfertasSection from './components/OfertasSection';
import BusquedaFiltrosSection from './components/BusquedaFiltrosSection';
import ComunidadSection from './components/ComunidadSection';

const HomePage = () => {
  useEffect(() => {
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animaciones con GSAP
    const ctx = gsap.context(() => {
      gsap.from('.fade-in', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fade-in',
          start: 'top 80%',
        }
      });
    });

    return () => ctx.revert(); // Limpieza
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <div className="fade-in">
        <NovedadesSection />
      </div>
      <div className="fade-in">
        <OfertasSection />
      </div>
      
      <div className="fade-in">
        <ComunidadSection />
      </div>
    </div>
  );
};

export default HomePage;
