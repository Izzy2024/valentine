export interface VideoPlaceholder {
  id: string;
  platform: 'YouTube' | 'Twitch';
  titlePlaceholder: string;
  channelName?: string; // Optional
}

export interface NewsPlaceholder {
  id: string;
  title: string;
  summaryPlaceholder: string;
  imageUrlPlaceholder?: string; // Hex color or a generic placeholder image URL
  datePlaceholder?: string;
  linkPlaceholder: string;
}

export const sampleVideos: VideoPlaceholder[] = [
  {
    id: 'vid1',
    platform: 'YouTube',
    titlePlaceholder: 'Gameplay Épico: Primeras Impresiones',
    channelName: 'GamerPro123',
  },
  {
    id: 'vid2',
    platform: 'Twitch',
    titlePlaceholder: 'Stream en Vivo: Noche de Torneo',
    channelName: 'StreamerDeluxe',
  },
  {
    id: 'vid3',
    platform: 'YouTube',
    titlePlaceholder: 'Tutorial: Cómo Mejorar tu Puntería',
    channelName: 'CoachGaming',
  },
];

export const sampleNews: NewsPlaceholder[] = [
  {
    id: 'news1',
    title: 'Actualización Importante del Juego v1.5',
    summaryPlaceholder: 'Descubre todas las nuevas características, mejoras de balance y corrección de errores que llegan con la última actualización...',
    imageUrlPlaceholder: '#334155', // Slate-700
    datePlaceholder: '15 de Julio, 2024',
    linkPlaceholder: '#',
  },
  {
    id: 'news2',
    title: 'Evento de Comunidad: ¡Doble XP este Fin de Semana!',
    summaryPlaceholder: 'Prepárate para subir de nivel más rápido que nunca. Únete a nuestro evento especial de doble experiencia...',
    imageUrlPlaceholder: '#1E3A8A', // Blue-800
    datePlaceholder: '12 de Julio, 2024',
    linkPlaceholder: '#',
  },
  {
    id: 'news3',
    title: 'Conoce al Equipo: Entrevista con el Diseñador Principal',
    summaryPlaceholder: 'Hemos charlado con nuestro diseñador principal sobre la filosofía detrás del juego y lo que se viene en el futuro...',
    imageUrlPlaceholder: '#047857', // Emerald-600
    datePlaceholder: '10 de Julio, 2024',
    linkPlaceholder: '#',
  },
];
