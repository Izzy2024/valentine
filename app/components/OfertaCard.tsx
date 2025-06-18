"use client"; // Required for hooks

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For potential number animation

interface OfertaCardProps {
  title: string;
  imageUrl: string; // Placeholder color or URL
  originalPrice: string;
  discountedPrice: string;
  endDatePlaceholder: string; // Will be replaced by actual countdown
  // Let's define a fixed target date for all offers for simplicity in this example
  targetDate: string;
  isSpotlight?: boolean;
  isDimmed?: boolean;
}

const cardSpotlightVariants = {
  normal: { opacity: 1, filter: 'brightness(100%)', scale: 1, transition: { duration: 0.3 } },
  spotlight: { opacity: 1, filter: 'brightness(110%)', scale: 1.05, transition: { duration: 0.3 } },
  dimmed: { opacity: 0.6, filter: 'brightness(70%)', scale: 0.98, transition: { duration: 0.3 } },
};


const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft: { days?: number; hours?: number; minutes?: number; seconds?: number } = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return timeLeft;
};

const OfertaCard: React.FC<OfertaCardProps> = ({ title, imageUrl, originalPrice, discountedPrice, targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTimeUnit = (unit: number | undefined) => unit?.toString().padStart(2, '0') || '00';

  let variant = "normal";
  if (isSpotlight) variant = "spotlight";
  if (isDimmed) variant = "dimmed";

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-2xl overflow-hidden text-white h-full flex flex-col"
      // Removed transform and hover:scale-105 from className as framer-motion handles it via variants
      variants={cardSpotlightVariants}
      animate={variant}
      // whileHover is removed to let the parent section control hover effect for spotlight
    >
      <div
        className="w-full h-56 bg-cover bg-center p-4 flex flex-col justify-end"
        style={{ backgroundColor: imageUrl.startsWith('#') ? imageUrl : undefined, backgroundImage: !imageUrl.startsWith('#') ? `url(${imageUrl})` : undefined }}
      >
        {!imageUrl.startsWith('#') && !imageUrl && <span className="flex items-center justify-center h-full text-gray-300 text-lg">Image Placeholder</span>}
         <h3 className="text-2xl font-bold mb-2 text-shadow-md bg-black bg-opacity-50 p-2 rounded">{title}</h3>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <span className="text-gray-300 line-through mr-2">{originalPrice}</span>
          <span className="text-3xl font-bold text-yellow-400">{discountedPrice}</span>
        </div>
        <div className="bg-gray-700 bg-opacity-50 rounded-md p-3 mb-4 text-center">
          {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
            <p className="text-lg font-semibold text-red-400">¡Oferta Terminada!</p>
          ) : (
            <div className="flex justify-center space-x-2 text-lg">
              {timeLeft.days !== undefined && timeLeft.days > 0 && (
                <span><span className="font-bold">{formatTimeUnit(timeLeft.days)}</span>d</span>
              )}
              <span><span className="font-bold">{formatTimeUnit(timeLeft.hours)}</span>h</span>
              <span><span className="font-bold">{formatTimeUnit(timeLeft.minutes)}</span>m</span>
              <span><span className="font-bold">{formatTimeUnit(timeLeft.seconds)}</span>s</span>
            </div>
          )}
        </div>
        <button
          className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg text-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          disabled={timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0}
        >
          VER OFERTA
        </button>
      </div>
    </motion.div>
  );
};

// Helper for text shadow (optional, can be done with Tailwind 3.0+)
const styles = `
.text-shadow-md {
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
`;

// You might inject this style in a global CSS file or a layout component
// For now, let's consider it as a conceptual addition for text visibility

export default OfertaCard;
