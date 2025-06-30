"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Datos para el carrusel de héroes
const heroData = [
  {
    id: 1,
    title: "Tu Próxima Aventura",
    subtitle: "Comienza Aquí",
    description: "Descubre los mejores juegos y vive experiencias únicas en mundos increíbles.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    cta: "EXPLORAR NOVEDADES",
    link: "/catalogo"
  },
  {
    id: 2,
    title: "Ofertas Exclusivas",
    subtitle: "Tiempo Limitado",
    description: "Aprovecha descuentos especiales en los títulos más populares. ¡No te los pierdas!",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    cta: "VER OFERTAS",
    link: "/ofertas"
  },
  {
    id: 3,
    title: "Próximos Lanzamientos",
    subtitle: "Reserva Ahora",
    description: "Sé el primero en jugar los títulos más esperados con nuestras preventas exclusivas.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    cta: "RESERVAR",
    link: "/proximamente"
  }
];

// Posiciones fijas para las partículas para evitar problemas de hidratación
const particlePositions = [
  { top: 10, left: 20, delay: 0 },
  { top: 30, left: 80, delay: 1 },
  { top: 60, left: 15, delay: 2 },
  { top: 80, left: 70, delay: 0.5 },
  { top: 20, left: 50, delay: 1.5 },
  { top: 70, left: 30, delay: 2.5 },
  { top: 40, left: 90, delay: 3 },
  { top: 90, left: 10, delay: 1.2 },
  { top: 15, left: 60, delay: 2.8 },
  { top: 85, left: 85, delay: 0.8 }
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentHero, setCurrentHero] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  useEffect(() => {
    setMounted(true);
    
    // Cambiar automáticamente el héroe cada 5 segundos
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Variantes de animación para el texto
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  if (!mounted) {
    return (
      <section className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-black">
        <div className="text-center">
          <h1 className="text-5xl font-display font-bold text-white mb-4">GameStore</h1>
          <p className="text-text-secondary">Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative flex items-center justify-center w-full h-screen overflow-hidden"
    >
      {/* Fondo con efecto parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`hero-bg-${currentHero}`}
          className="absolute top-0 left-0 w-full h-full"
          style={{ y: backgroundY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-10000 ease-in-out transform scale-105 animate-slow-zoom"
            style={{
              backgroundImage: `url('${heroData[currentHero].image}')`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background"></div>
          
          {/* Efecto de partículas flotantes con posiciones fijas */}
          <div className="absolute inset-0 overflow-hidden">
            {particlePositions.map((particle, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white opacity-30"
                style={{
                  top: `${particle.top}%`,
                  left: `${particle.left}%`,
                  animation: `float ${8 + (i % 3) * 2}s infinite ease-in-out ${particle.delay}s`
                }}
              ></div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Indicadores de carrusel */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-2">
        {heroData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHero(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentHero ? 'bg-secondary w-6' : 'bg-white/30'}`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          ></button>
        ))}
      </div>
      
      {/* Contenido del héroe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-content-${currentHero}`}
            className="relative z-10 text-center p-4 max-w-4xl"
            style={{ y: contentY, opacity: contentOpacity }}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.span 
              custom={0} 
              variants={textVariants}
              className="inline-block px-4 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-secondary-light text-sm font-semibold mb-4 border border-primary/30"
            >
              DESTACADO
            </motion.span>
            
            <motion.h2 
              custom={1} 
              variants={textVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-2"
            >
              {heroData[currentHero].title}
            </motion.h2>
            
            <motion.h3 
              custom={2} 
              variants={textVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-6"
            >
              {heroData[currentHero].subtitle}
            </motion.h3>
            
            <motion.p 
              custom={3} 
              variants={textVariants}
              className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
            >
              {heroData[currentHero].description}
            </motion.p>
            
            <motion.div custom={4} variants={textVariants}>
              <Link href={heroData[currentHero].link}>
                <button className="btn btn-primary mr-4 shadow-glow">
                  {heroData[currentHero].cta}
                </button>
              </Link>
              <Link href="/catalogo">
                <button className="btn btn-outline">
                  VER CATÁLOGO
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Decoración de esquinas */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-secondary/30 rounded-br-3xl"></div>
    </motion.section>
  );
};

export default HeroSection;