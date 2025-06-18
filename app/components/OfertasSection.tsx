"use client";

import React, { useState } from 'react'; // Import useState
import { motion } from 'framer-motion'; // Import motion
import OfertaCard from './OfertaCard';
import { sampleDeals, Deal } from '../data/sampleDeals';

const OfertasSection: React.FC = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          ¡Ofertas Imperdibles!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleDeals.map((deal: Deal) => (
            <motion.div
              key={deal.id}
              onMouseEnter={() => setHoveredCardId(deal.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              // Animate prop will be handled within OfertaCard based on a new prop
            >
              <OfertaCard
                // key={deal.id} // key is on motion.div now
                title={deal.title}
                imageUrl={deal.imageUrl}
                originalPrice={deal.originalPrice}
                discountedPrice={deal.discountedPrice}
                targetDate={deal.targetDate}
                isSpotlight={hoveredCardId === deal.id} // Pass spotlight status
                isDimmed={hoveredCardId !== null && hoveredCardId !== deal.id} // Pass dimmed status
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfertasSection;
