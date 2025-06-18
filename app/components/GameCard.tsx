import React from 'react';
import { motion } from 'framer-motion'; // Import motion

interface GameCardProps {
  title: string;
  imageUrl: string; // Will be a placeholder color or URL
  platforms: string[];
  isPreorder?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ title, imageUrl, platforms, isPreorder }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.2 }
      }}
      // Removed direct transform and hover:scale-105 from className as framer-motion handles it
    >
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundColor: imageUrl.startsWith('#') ? imageUrl : undefined, backgroundImage: !imageUrl.startsWith('#') ? `url(${imageUrl})` : undefined }}
      >
        {!imageUrl.startsWith('#') && !imageUrl && <span className="flex items-center justify-center h-full text-gray-400">Image Placeholder</span>}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2 truncate" title={title}>{title}</h3>
        <div className="text-sm text-gray-400 mb-3">
          {platforms.join(', ')}
        </div>
        <button
          className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors duration-200 ${
            isPreorder
              ? 'bg-purple-600 group-hover:bg-purple-700' // Changed hover to group-hover if needed, but framer-motion hover is on parent
              : 'bg-green-600 group-hover:bg-green-700'   // Same as above
          }`}
          // It's generally better if button hover effects are independent or also use framer-motion
          // For now, keeping Tailwind's hover, but it might conflict or feel different.
          // A pure framer-motion approach would be <motion.button whileHover={{...}} >
        >
          {isPreorder ? 'Pre-ordenar' : 'Comprar Ahora'}
        </button>
      </div>
    </div>
  );
};

export default GameCard;
