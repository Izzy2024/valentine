export interface Game {
  id: string;
  title: string;
  imageUrl: string; // Can be a hex color or a URL
  platforms: string[];
  isPreorder?: boolean;
  genre: string; // Added for filtering
  price: number; // Added for filtering
}

export const sampleGames: Game[] = [
  {
    id: '1',
    title: 'Cyber Odyssey: Neon City',
    imageUrl: '#7D26CD', // Purple placeholder
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    isPreorder: true,
    genre: 'RPG',
    price: 59.99,
  },
  {
    id: '2',
    title: 'Forest Guardian Chronicles',
    imageUrl: '#2E8B57', // Green placeholder
    platforms: ['PC', 'Nintendo Switch'],
    genre: 'Aventura',
    price: 39.99,
  },
  {
    id: '3',
    title: 'Space Voyager Elite',
    imageUrl: '#000080', // Navy placeholder
    platforms: ['PC', 'Xbox Series X'],
    genre: 'Simulación',
    price: 49.99,
  },
  {
    id: '4',
    title: 'Lost Realms: The Ancient Secret',
    imageUrl: '#A0522D', // Sienna placeholder
    platforms: ['PS5', 'PC'],
    genre: 'Aventura',
    price: 29.99,
  },
  {
    id: '5',
    title: 'Speed Demons: Urban Pursuit',
    imageUrl: '#FF4500', // OrangeRed placeholder
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    isPreorder: true,
    genre: 'Carreras',
    price: 59.99,
  },
  {
    id: '6',
    title: 'Mystic Shores: The Pirate Queen',
    imageUrl: '#4682B4', // SteelBlue placeholder
    platforms: ['PC', 'Nintendo Switch', 'PS5'],
    genre: 'RPG',
    price: 44.99,
  },
  {
    id: '7',
    title: 'Galaxy Defenders: Uprising',
    imageUrl: '#DC143C', // Crimson placeholder
    platforms: ['Xbox Series X', 'PC'],
    genre: 'Acción',
    price: 59.99,
  },
  {
    id: '8',
    title: 'Indie Pixel Jumper',
    imageUrl: '#FFD700', // Gold placeholder
    platforms: ['PC', 'Indie'], // Assuming "Indie" can be a platform filter
    genre: 'Plataformas',
    price: 9.99,
  },
  {
    id: '9',
    title: 'Strategy Masters: Kingdoms',
    imageUrl: '#8B4513', // SaddleBrown placeholder
    platforms: ['PC'],
    genre: 'Estrategia',
    price: 39.99,
  },
  {
    id: '10',
    title: 'Puzzle Box Wonders',
    imageUrl: '#5F9EA0', // CadetBlue placeholder
    platforms: ['Nintendo Switch', 'Móvil'],
    genre: 'Puzzle',
    price: 19.99,
  },
];
