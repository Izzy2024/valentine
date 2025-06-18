export interface Deal {
  id: string;
  title: string;
  imageUrl: string; // Can be a hex color or a URL
  originalPrice: string;
  discountedPrice: string;
  endDatePlaceholder?: string; // Optional now, as we use targetDate
  targetDate: string; // ISO string or a string Date.parse can handle
}

// Helper to create future dates for sample data
const getFutureDate = (hoursToAdd: number): string => {
  const date = new Date();
  date.setHours(date.getHours() + hoursToAdd);
  return date.toISOString();
};

export const sampleDeals: Deal[] = [
  {
    id: 'deal1',
    title: 'Aventura Épica: Edición Definitiva',
    imageUrl: '#B22222', // Firebrick placeholder
    originalPrice: '$59.99',
    discountedPrice: '$29.99',
    targetDate: getFutureDate(2), // Ends in 2 hours
  },
  {
    id: 'deal2',
    title: 'Constructor de Mundos Pro',
    imageUrl: '#20B2AA', // LightSeaGreen placeholder
    originalPrice: '$39.99',
    discountedPrice: '$19.99',
    targetDate: getFutureDate(24), // Ends in 24 hours
  },
  {
    id: 'deal3',
    title: 'Indie Gems Bundle Vol. 3',
    imageUrl: '#DAA520', // Goldenrod placeholder
    originalPrice: '$49.99',
    discountedPrice: '$24.99',
    targetDate: getFutureDate(72), // Ends in 3 days
  },
  // { // Example for a 4th deal if needed
  //   id: 'deal4',
  //   title: 'Retro Racer Collection',
  //   imageUrl: '#4B0082', // Indigo placeholder
  //   originalPrice: '$29.99',
  //   discountedPrice: '$9.99',
  //   endDatePlaceholder: 'Solo por 48 horas!',
  // },
];
