"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleGames, Game } from '../data/sampleGames'; // Import sampleGames
import GameCard from './GameCard'; // Import GameCard

// --- Constants for Filters ---
const PLATFORMS = ['PC', 'PS5', 'Xbox Series X', 'Nintendo Switch', 'Móvil', 'Indie'];
const GENRES = ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Simulación', 'Plataformas', 'Carreras', 'Puzzle', 'Deportes'];
const PRICE_RANGES = [
  { label: 'Todos', min: 0, max: Infinity },
  { label: '$0 - $20', min: 0, max: 20 },
  { label: '$20 - $40', min: 20, max: 40 },
  { label: '$40 - $60', min: 40, max: 60 },
  { label: '$60+', min: 60, max: Infinity },
];

// --- Helper Components ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  role?: string; // Optional role for ARIA
}

const FilterChip: React.FC<FilterChipProps> = ({ label, isSelected, onClick, role }) => (
  <button
    type="button"
    onClick={onClick}
    role={role || "button"}
    aria-pressed={role !== "radio" ? isSelected : undefined} // Use aria-pressed for non-radio roles
    aria-checked={role === "radio" ? isSelected : undefined}  // Use aria-checked for radio role
    className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500
      ${isSelected
        ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-105'
        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:border-gray-500 active:scale-95'
      }`}
  >
    {label}
  </button>
);

// --- Main Section Component ---
const BusquedaFiltrosSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]); // Default to 'Todos'

  // Memoized filtered games
  const filteredGames = useMemo(() => {
    return sampleGames.filter(game => {
      // Search term filter (title or genre)
      const term = searchTerm.toLowerCase();
      const matchesSearchTerm = term === '' ||
                                game.title.toLowerCase().includes(term) ||
                                game.genre.toLowerCase().includes(term);

      // Platform filter
      const matchesPlatform = !selectedPlatform || game.platforms.includes(selectedPlatform);

      // Genre filter
      const matchesGenre = !selectedGenre || game.genre === selectedGenre;

      // Price range filter
      const matchesPrice = game.price >= selectedPriceRange.min && game.price < selectedPriceRange.max;

      return matchesSearchTerm && matchesPlatform && matchesGenre && matchesPrice;
    });
  }, [searchTerm, selectedPlatform, selectedGenre, selectedPriceRange]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedPlatform(null);
    setSelectedGenre(null);
    setSelectedPriceRange(PRICE_RANGES[0]);
  };

  // Animation variants for GameCard grid
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 } // Stagger children for cascade effect
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <section className="py-12 bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Encuentra Tu Próximo Juego</h2>

        {/* Barra de Búsqueda */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar por título o género..."
              className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar juegos por título o género" // ARIA label for search input
            />
            <button
              type="button"
              aria-label="Iniciar búsqueda" // ARIA label for search button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-r-lg transition-colors duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
              onClick={() => { /* Explicit search button click, though filtering is real-time */ }}
            >
              <SearchIcon />
              <span className="ml-2 hidden md:inline">Buscar</span>
            </button>
          </div>
        </div>

        {/* Controles de Filtro */}
        <div className="space-y-6 mb-12">
          {/* Plataforma */}
          <div role="group" aria-labelledby="platform-filter-heading">
            <h3 id="platform-filter-heading" className="text-xl font-semibold mb-3">Plataforma</h3>
            <div className="flex flex-wrap gap-3">
              {PLATFORMS.map(platform => (
                <FilterChip
                  key={platform}
                  label={platform}
                  isSelected={selectedPlatform === platform}
                  onClick={() => setSelectedPlatform(prev => prev === platform ? null : platform)}
                  role="radio" // Changed to radio as it's single select within this group
                />
              ))}
            </div>
          </div>
          {/* Género */}
          <div role="group" aria-labelledby="genre-filter-heading">
            <h3 id="genre-filter-heading" className="text-xl font-semibold mb-3">Género</h3>
            <div className="flex flex-wrap gap-3">
              {GENRES.map(genre => (
                <FilterChip
                  key={genre}
                  label={genre}
                  isSelected={selectedGenre === genre}
                  onClick={() => setSelectedGenre(prev => prev === genre ? null : genre)}
                  role="radio" // Changed to radio
                />
              ))}
            </div>
          </div>
          {/* Rango de Precios */}
          <div role="group" aria-labelledby="price-filter-heading">
            <h3 id="price-filter-heading" className="text-xl font-semibold mb-3">Rango de Precios</h3>
            <div className="flex flex-wrap gap-3">
              {PRICE_RANGES.map(range => (
                <FilterChip
                  key={range.label}
                  label={range.label}
                  isSelected={selectedPriceRange.label === range.label}
                  onClick={() => setSelectedPriceRange(range)}
                  role="radio" // Changed to radio
                />
              ))}
            </div>
          </div>
          {/* Clear Filters Button */}
          <div className="pt-4 text-center">
            <button
              onClick={handleClearFilters}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Resultados Filtrados */}
        <AnimatePresence mode="wait">
          <motion.div
            key={JSON.stringify(selectedFilters) + searchTerm} // Re-trigger animation on filter/search change
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredGames.length > 0 ? (
              filteredGames.map((game: Game) => (
                <motion.div key={game.id} variants={gridItemVariants}>
                  <GameCard
                    title={game.title}
                    imageUrl={game.imageUrl}
                    platforms={game.platforms}
                    isPreorder={game.isPreorder}
                    // Pass price and genre if GameCard is updated to display them
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-10"
              >
                <p className="text-xl text-gray-400">No se encontraron juegos que coincidan con tu búsqueda.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BusquedaFiltrosSection;
