"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = usePathname();

  // Detectar scroll para cambiar la apariencia de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-glass py-2' : 'bg-transparent py-4'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="font-display text-2xl font-bold text-gradient">GameStore</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link href="/catalogo" className={`animated-link relative px-3 py-2 text-sm font-medium ${currentPath === '/catalogo' ? 'text-secondary-light' : 'text-white'} hover:text-secondary-light transition-colors duration-300`}>
                Catálogo
              </Link>
              <Link href="/ofertas" className={`animated-link relative px-3 py-2 text-sm font-medium ${currentPath === '/ofertas' ? 'text-secondary-light' : 'text-white'} hover:text-secondary-light transition-colors duration-300`}>
                Ofertas
              </Link>
              <Link href="/quienes-somos" className={`animated-link relative px-3 py-2 text-sm font-medium ${currentPath === '/quienes-somos' ? 'text-secondary-light' : 'text-white'} hover:text-secondary-light transition-colors duration-300`}>
                Quiénes Somos
              </Link>
              <Link href="/blog" className={`animated-link relative px-3 py-2 text-sm font-medium ${currentPath === '/blog' ? 'text-secondary-light' : 'text-white'} hover:text-secondary-light transition-colors duration-300`}>
                Blog
              </Link>
            </div>
          </div>
          
          {/* Cart and User */}
          <div className="hidden md:flex items-center">
            <Link href="/carrito" className={`p-2 rounded-full hover-glow ${currentPath === '/carrito' ? 'bg-card-hover' : ''} hover:bg-card-hover relative transition-all duration-300`}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-accent text-xs text-white font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-glow pulse">0</span>
              </motion.div>
            </Link>
            <Link href="/cuenta" className={`ml-4 p-2 rounded-full hover-glow ${currentPath === '/cuenta' ? 'bg-card-hover' : ''} hover:bg-card-hover transition-all duration-300`}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.div>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary-light hover:bg-card-hover focus:outline-none transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : -20
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-glass mt-2 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/5 mx-4">
          <div className="space-y-2">
            {[
              { href: "/catalogo", label: "Catálogo" },
              { href: "/ofertas", label: "Ofertas" },
              { href: "/quienes-somos", label: "Quiénes Somos" },
              { href: "/blog", label: "Blog" },
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`block px-4 py-3 rounded-md text-base font-medium ${currentPath === item.href ? 'text-secondary-light' : 'text-white'} hover:text-secondary-light transition-colors duration-300 border-b border-white/5 last:border-0`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-around pt-4 mt-2 border-t border-white/5">
            <Link href="/carrito" className={`p-3 rounded-full hover-glow ${currentPath === '/carrito' ? 'bg-card-hover' : ''} hover:bg-card-hover relative transition-all duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-accent text-xs text-white font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-glow">0</span>
            </Link>
            <Link href="/cuenta" className={`p-3 rounded-full hover-glow ${currentPath === '/cuenta' ? 'bg-card-hover' : ''} hover:bg-card-hover transition-all duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;