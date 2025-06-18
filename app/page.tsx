"use client"; // Required for useState and useEffect

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion
import HeroSection from './components/HeroSection';
import NovedadesSection from './components/NovedadesSection';
import OfertasSection from './components/OfertasSection';
import BusquedaFiltrosSection from './components/BusquedaFiltrosSection';
// import ComunidadSection from './components/ComunidadSection'; // Original static import
import dynamic from 'next/dynamic'; // Import dynamic

// Dynamically import ComunidadSection
const ComunidadSectionDynamic = dynamic(() => import('./components/ComunidadSection'), {
  ssr: false, // Optional: disable server-side rendering for this component if it's client-heavy
  loading: () => (
    <div className="flex items-center justify-center h-64 bg-gray-800 text-white">
      <p className="text-xl">Cargando Comunidad...</p>
    </div>
  ),
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (isLoading) {
    return (
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center h-screen bg-gray-900"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1, 1.2, 1],
                opacity: [0.5, 1, 0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="w-8 h-8 bg-blue-500 rounded-full"
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }} // Delay ensures preloader exit animation completes
      >
        <HeroSection />
        <NovedadesSection />
        <OfertasSection />
        <BusquedaFiltrosSection />
        <ComunidadSection />
      </motion.div>
    </AnimatePresence>
  );
}
