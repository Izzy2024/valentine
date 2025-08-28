# GameStore - Documentación Técnica

## Índice

1. [Arquitectura](#arquitectura)
2. [Componentes](#componentes)
3. [Estilos](#estilos)
4. [Animaciones](#animaciones)
5. [Rutas](#rutas)
6. [Datos](#datos)
7. [Optimizaciones](#optimizaciones)
8. [Problemas Conocidos](#problemas-conocidos)

## Arquitectura

GameStore está construido con Next.js 14 utilizando el App Router. La aplicación sigue una arquitectura basada en componentes con un enfoque en la experiencia de usuario y las animaciones fluidas.

### Estructura de Directorios

- **app/**: Contiene el código principal de la aplicación
  - **components/**: Componentes reutilizables
  - **data/**: Datos de muestra para juegos, ofertas, etc.
  - **pages/**: Páginas adicionales para React Router
  - **catalogo/**: Implementación de la ruta de catálogo
  - **globals.css**: Estilos globales y variables CSS
  - **layout.tsx**: Layout principal con ScrollSmoother
  - **page.tsx**: Página principal

### Patrones de Diseño

- **Component-Based Architecture**: Cada elemento de UI es un componente reutilizable
- **Prop Drilling**: Para pasar datos entre componentes relacionados
- **Custom Hooks**: Para lógica reutilizable (ej: useScrollEffect)
- **Context API**: Para estado global cuando sea necesario

## Componentes

### Navbar

```tsx
// app/components/Navbar.tsx
// Barra de navegación responsive con menú móvil
```

**Props**: Ninguna

**Estado**:
- `isOpen`: Controla la visibilidad del menú móvil
- `scrolled`: Detecta si el usuario ha hecho scroll para cambiar la apariencia

**Características**:
- Menú responsive que se convierte en hamburguesa en móviles
- Animación de transición al hacer scroll
- Indicador de página activa
- Contador de items en carrito

### HeroSection

```tsx
// app/components/HeroSection.tsx
// Sección principal con carrusel de destacados
```

**Props**: Ninguna

**Estado**:
- `currentHero`: Índice del héroe actual en el carrusel
- `mounted`: Estado para controlar la hidratación

**Características**:
- Carrusel automático con transiciones suaves
- Efecto parallax al hacer scroll
- Partículas animadas en el fondo
- Animaciones secuenciales de texto

### GameCard

```tsx
// app/components/GameCard.tsx
// Tarjeta para mostrar juegos
```

**Props**:
- `title`: Título del juego
- `imageUrl`: URL de la imagen del juego
- `platforms`: Array de plataformas disponibles
- `isPreorder`: Booleano que indica si es pre-orden

**Características**:
- Animación de hover con escala
- Validación de props
- Diseño adaptable

### OfertaCard

```tsx
// app/components/OfertaCard.tsx
// Tarjeta para mostrar ofertas con countdown
```

**Props**:
- `title`: Título de la oferta
- `imageUrl`: URL de la imagen
- `originalPrice`: Precio original
- `discountedPrice`: Precio con descuento
- `targetDate`: Fecha límite de la oferta
- `isSpotlight`: Si está destacada
- `isDimmed`: Si está atenuada

**Características**:
- Countdown en tiempo real
- Animaciones de spotlight
- Manejo seguro de hidratación

## Estilos

### Sistema de Diseño

GameStore utiliza un sistema de diseño basado en Tailwind CSS con variables CSS personalizadas para mantener consistencia.

### Variables CSS

```css
/* app/globals.css */
:root {
  /* Esquema de color cyberpunk/gaming moderno */
  --color-primary: 111, 76, 255;         /* Púrpura neón */
  --color-primary-light: 147, 112, 255;  /* Púrpura neón claro */
  --color-secondary: 0, 225, 255;        /* Cian eléctrico */
  --color-secondary-light: 72, 249, 255; /* Cian eléctrico claro */
  --color-accent: 255, 71, 87;           /* Rojo coral */
  --color-accent-alt: 255, 214, 0;       /* Amarillo eléctrico */
  
  /* Fondos oscuros con variaciones */
  --color-background: 13, 13, 18;        /* Negro azulado oscuro */
  --color-card: 22, 22, 30;              /* Negro azulado */
  --color-card-hover: 32, 32, 45;        /* Negro azulado claro */
  
  /* Textos */
  --color-text: 255, 255, 255;           /* Blanco */
  --color-text-secondary: 190, 190, 210; /* Gris azulado claro */
  --color-text-muted: 130, 130, 160;     /* Gris azulado */
}
```

### Clases Utilitarias Personalizadas

```css
/* app/globals.css */
@layer components {
  .bg-glass {
    @apply bg-black/70 backdrop-blur-md border border-white/10;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
  
  .card {
    @apply bg-card rounded-xl shadow-lg border border-white/5 overflow-hidden transition-all duration-300;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  
  .btn {
    @apply px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-block;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  
  /* Más clases utilitarias... */
}
```

## Animaciones

### Framer Motion

Utilizado para:
- Animaciones de componentes UI
- Transiciones de página
- Efectos de hover
- Menú móvil

### GSAP

Utilizado para:
- ScrollSmoother (scroll suave)
- Animaciones basadas en scroll
- Animaciones complejas y secuenciales
- Parallax

### ScrollSmoother

```tsx
// app/components/ScrollSmootherWrapper.tsx
// Implementación de scroll suave con GSAP
```

**Características**:
- Scroll suave en toda la aplicación
- Soporte para efectos de velocidad con data-speed
- Manejo seguro de hidratación

## Rutas

### Rutas Implementadas

- `/`: Página principal
- `/catalogo`: Catálogo de juegos
- `/ofertas`: Página de ofertas
- `/quienes-somos`: Página sobre nosotros
- `/blog`: Blog de gaming
- `/carrito`: Carrito de compras
- `/cuenta`: Perfil de usuario

## Datos

### Estructura de Datos

```typescript
// app/data/sampleGames.ts
export interface Game {
  id: string | number;
  title: string;
  imageUrl: string;
  platforms: string[];
  genre: string;
  price: number;
  rating: number;
  isPreorder?: boolean;
}

// app/data/sampleDeals.ts
export interface Deal {
  id: string;
  title: string;
  imageUrl: string;
  originalPrice: string;
  discountedPrice: string;
  targetDate: string;
}

// Más interfaces de datos...
```

## Optimizaciones

### Rendimiento

- Lazy loading de componentes pesados
- Optimización de imágenes
- Minimización de re-renderizados
- Code splitting automático de Next.js

### Accesibilidad

- Etiquetas ARIA para elementos interactivos
- Contraste adecuado para texto
- Soporte para navegación por teclado
- Modo de alto contraste

## Problemas Conocidos

1. **Hidratación**: Posibles errores de hidratación con elementos que usan Math.random()
2. **Compatibilidad**: Algunas animaciones pueden no funcionar correctamente en navegadores antiguos
3. **Rendimiento**: Las animaciones pueden afectar el rendimiento en dispositivos de gama baja

## Próximos Pasos

1. Implementar autenticación de usuarios
2. Conectar con un backend real
3. Mejorar la accesibilidad
4. Optimizar el rendimiento en dispositivos móviles
5. Añadir tests unitarios y de integración