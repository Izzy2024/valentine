"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface GameCardProps {
  title: string;
  imageUrl: string;
  platforms: string[];
  isPreorder?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ title, imageUrl, platforms, isPreorder }) => {
  // Validación de props
  if (!title || !imageUrl || !platforms) {
    return null;
  }

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.2 }
      }}
    >
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ 
          backgroundColor: imageUrl.startsWith('#') ? imageUrl : undefined, 
          backgroundImage: !imageUrl.startsWith('#') ? `url(${imageUrl})` : undefined 
        }}
      >
        {!imageUrl.startsWith('#') && !imageUrl && (
          <span className="flex items-center justify-center h-full text-gray-400">
            Image Placeholder
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2 truncate" title={title}>
          {title}
        </h3>
        <div className="text-sm text-gray-400 mb-3">
          {platforms.join(', ')}
        </div>
        <button
          className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors duration-200 ${
            isPreorder
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isPreorder ? 'Pre-ordenar' : 'Comprar Ahora'}
        </button>
      </div>
    </motion.div>
  );
};

export default GameCard;