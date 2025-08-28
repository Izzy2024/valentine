# GameStore - Tienda de Videojuegos

![GameStore Logo](https://via.placeholder.com/200x80/111122/6C63FF?text=GameStore)

Una moderna tienda de videojuegos online con diseño cyberpunk/neón, desarrollada con Next.js, React, Tailwind CSS, Framer Motion y GSAP.

## 📋 Características

- **Diseño Moderno**: Interfaz de usuario con estética gaming cyberpunk/neón
- **Animaciones Fluidas**: Transiciones y efectos visuales con Framer Motion y GSAP
- **Scroll Suave**: Implementación de GSAP ScrollSmoother
- **Totalmente Responsivo**: Diseño adaptable a móviles, tablets y escritorio
- **Catálogo de Juegos**: Filtrado y búsqueda de juegos por plataforma, género y precio
- **Carrito de Compras**: Funcionalidad básica de carrito de compras
- **Cuenta de Usuario**: Perfil de usuario con historial de pedidos

## 🚀 Tecnologías

- **Frontend**: Next.js 14, React 18
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion, GSAP
- **Iconos**: SVG personalizados
- **Fuentes**: Orbitron, Exo 2

## 🛠️ Estructura del Proyecto

```
valentine-1/
├── .amazonq/              # Reglas para Amazon Q
├── app/                   # Código principal de la aplicación
│   ├── components/        # Componentes reutilizables
│   ├── data/              # Datos de muestra
│   ├── pages/             # Páginas adicionales
│   ├── catalogo/          # Ruta de catálogo
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── public/                # Archivos estáticos
└── tailwind.config.ts     # Configuración de Tailwind
```

## 📦 Componentes Principales

- **Navbar**: Barra de navegación con menú responsive
- **HeroSection**: Sección principal con carrusel de destacados
- **GameCard**: Tarjeta para mostrar juegos
- **OfertaCard**: Tarjeta para mostrar ofertas con countdown
- **Dropdown**: Componente de menú desplegable
- **AnimatedBackground**: Fondo animado con partículas
- **ScrollSmootherWrapper**: Implementación de scroll suave

## 🎨 Esquema de Colores

- **Primario**: Púrpura neón (#6C4CFF)
- **Secundario**: Cian eléctrico (#00E1FF)
- **Acento**: Rojo coral (#FF4757)
- **Acento Alt**: Amarillo eléctrico (#FFD600)
- **Fondo**: Negro azulado oscuro (#0D0D12)

## 🚀 Cómo Empezar

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd valentine-1
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   [http://localhost:3000](http://localhost:3000)

## 📝 Reglas de Desarrollo

- Mantener la estética gaming cyberpunk/neón
- Usar `className` en lugar de `class` en componentes React
- Validar props en todos los componentes
- Evitar problemas de hidratación (no usar Math.random() directamente en el renderizado)
- Seguir los patrones de diseño establecidos para componentes UI
- Documentar código complejo

## 📱 Capturas de Pantalla

*(Aquí irían capturas de pantalla de las principales secciones)*

## 🔮 Próximas Características

- Integración con backend para autenticación
- Sistema de reseñas de juegos
- Wishlist personalizada
- Recomendaciones basadas en preferencias
- Modo oscuro/claro

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.