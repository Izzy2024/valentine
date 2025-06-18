"use client"; // Required for framer-motion hooks

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"] // Track scroll from start of section to end of section when it starts leaving viewport
  });

  // Parallax for the content
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Moves content down by 50% of its height as section scrolls out
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]); // Fades out content

  // Parallax for the background (slower scroll)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // Moves background down slower

  return (
    <motion.section ref={sectionRef} className="relative flex items-center justify-center w-full h-screen overflow-hidden">
      {/* Video Background Placeholder */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-black"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-xl">Video Background Placeholder</p>
        </div>
      </motion.div>
      {/* Content Overlay */}
      <motion.div
        className="relative z-10 text-center p-4"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center"> {/* Responsive text size */}
          Tu Próxima Aventura Comienza Aquí
        </h1>
        <button
          className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md transition-transform duration-150 ease-in-out hover:bg-blue-700 active:scale-95"
        >
          EXPLORAR NOVEDADES
        </button>
      </div>
    </motion.section>
  );
};

export default HeroSection;
