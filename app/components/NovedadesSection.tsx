"use client";

import React from 'react';
import { motion } from 'framer-motion'; // Import motion
// Swiper imports commented out due to installation issues
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// Swiper imports commented out due to installation issues
// ... (keep commented Swiper imports as they are)

import GameCard from './GameCard';
import { sampleGames, Game } from '../data/sampleGames';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({ // i is the custom index for stagger
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Staggered delay
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const NovedadesSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Novedades y Próximos Lanzamientos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleGames.map((game: Game, index: number) => (
            <motion.div
              key={game.id}
              custom={index} // Pass index to variants for stagger
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the card is visible
              variants={cardVariants}
            >
              <GameCard
                title={game.title}
                imageUrl={game.imageUrl}
                platforms={game.platforms}
                isPreorder={game.isPreorder}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NovedadesSection;
