"use client";

import React from 'react';
import { sampleVideos, VideoPlaceholder, sampleNews, NewsPlaceholder } from '../data/sampleCommunityContent';

// Placeholder for Play Icon
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={0} stroke="none" className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

const ComunidadSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600">
          Comunidad y Contenido Destacado
        </h2>

        {/* Videos Destacados */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center sm:text-left">Videos Destacados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleVideos.map((video: VideoPlaceholder) => (
              <div
                key={video.id}
                className="group relative bg-gray-700 rounded-lg shadow-lg overflow-hidden aspect-video flex items-center justify-center cursor-pointer hover:shadow-cyan-500/50 transition-shadow"
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity"></div>
                <PlayIcon />
                <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black via-black/70 to-transparent">
                  <h4 className="text-lg font-semibold text-white truncate" title={video.titlePlaceholder}>
                    {video.titlePlaceholder}
                  </h4>
                  <p className="text-sm text-gray-300">{video.platform} - {video.channelName || 'Canal Oficial'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Noticias y Blog */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center sm:text-left">Últimas Noticias</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sampleNews.map((newsItem: NewsPlaceholder) => (
              <a
                key={newsItem.id}
                href={newsItem.linkPlaceholder}
                className="bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block group"
              >
                <div
                  className="w-full h-40 bg-cover bg-center"
                  style={{ backgroundColor: newsItem.imageUrlPlaceholder || '#4A5568' }} // Default gray if no image
                >
                  {/* Placeholder for actual image if URL was provided */}
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors truncate" title={newsItem.title}>
                    {newsItem.title}
                  </h4>
                  <p className="text-sm text-gray-300 mb-2 h-16 overflow-hidden">{newsItem.summaryPlaceholder}</p>
                  {newsItem.datePlaceholder && <p className="text-xs text-gray-400">{newsItem.datePlaceholder}</p>}
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md transition-colors duration-200"
            >
              Ver Todas las Noticias
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComunidadSection;
