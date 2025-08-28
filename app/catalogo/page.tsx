"use client";

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sampleGames, Game } from '../data/sampleGames';
import GameCard from '../components/GameCard';
import Dropdown from '../components/Dropdown';

const CatalogoPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [platform, setPlatform] = useState('Todos');
  const [genre, setGenre] = useState('Todos');
  const [sort, setSort] = useState('Más Recientes');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga
  const gamesPerPage = 12; // Número de juegos por página

  useEffect(() => {
    // Simular carga de juegos y establecer el estado de carga
    setGames(sampleGames);
    setIsLoading(false); // Datos cargados

    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animaciones con GSAP
    const ctx = gsap.context(() => {
      gsap.from('.page-header', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.from('.catalog-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert(); // Limpieza
  }, []);

  const platforms = ['Todos', ...Array.from(new Set(games.flatMap(game => game.platforms)))];
  const genres = ['Todos', ...Array.from(new Set(games.map(game => game.genre)))];

  const filteredGames = games
    .filter(game => platform === 'Todos' || game.platforms.includes(platform))
    .filter(game => genre === 'Todos' || game.genre === genre)
    .filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Precio (Menor a Mayor)') {
        return a.price - b.price;
      }
      if (sort === 'Calificación') {
        return b.rating - a.rating;
      }
      return 0;
    });

  // Lógica de paginación
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Mover renderPageNumbers dentro del componente
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full ${currentPage === i ? 'bg-card' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  if (isLoading) {
    return (
      <div className="catalogo-page flex justify-center items-center min-h-screen">
        <p className="text-white text-xl">Cargando juegos...</p>
      </div>
    );
  }

  return (
    <div className="catalogo-page">
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Catálogo de Juegos</p>
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div
                  className="text-text-muted flex border-none bg-card items-center justify-center pl-4 rounded-l-lg border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <input
                  placeholder="Buscar juego..."
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-card focus:border-none h-full placeholder:text-text-muted px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="flex gap-3 p-3 flex-wrap pr-4">
            <Dropdown label="Plataforma" options={platforms} selected={platform} onSelect={setPlatform} />
            <Dropdown label="Género" options={genres} selected={genre} onSelect={setGenre} />
          </div>
          <div className="flex px-4 py-3">
            <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-card p-1">
              <label
                className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-background has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-white text-text-muted text-sm font-medium leading-normal"
              >
                <span className="truncate">Más Recientes</span>
                <input type="radio" name="sort" className="invisible w-0" value="Más Recientes" checked={sort === 'Más Recientes'} onChange={e => setSort(e.target.value)} />
              </label>
              <label
                className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-background has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-white text-text-muted text-sm font-medium leading-normal"
              >
                <span className="truncate">Precio (Menor a Mayor)</span>
                <input type="radio" name="sort" className="invisible w-0" value="Precio (Menor a Mayor)" checked={sort === 'Precio (Menor a Mayor)'} onChange={e => setSort(e.target.value)} />
              </label>
              <label
                className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-background has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-white text-text-muted text-sm font-medium leading-normal"
              >
                <span className="truncate">Calificación</span>
                <input type="radio" name="sort" className="invisible w-0" value="Calificación" checked={sort === 'Calificación'} onChange={e => setSort(e.target.value)} />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            {currentGames.length > 0 ? (
              currentGames.map(game => (
                <GameCard 
                  key={game.id} 
                  title={game.title}
                  imageUrl={game.imageUrl}
                  platforms={game.platforms}
                  isPreorder={game.isPreorder}
                />
              ))
            ) : (
              <p className="text-text-muted text-center col-span-full">No se encontraron juegos.</p>
            )}
          </div>
          <div className="flex items-center justify-center p-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex size-10 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-white" data-icon="CaretLeft" data-size="18px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                </svg>
              </div>
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex size-10 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-white" data-icon="CaretRight" data-size="18px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogoPage;