# Guía de Contribución - GameStore

¡Gracias por tu interés en contribuir a GameStore! Esta guía te ayudará a entender el proceso de contribución y los estándares que seguimos.

## Índice

1. [Código de Conducta](#código-de-conducta)
2. [Cómo Contribuir](#cómo-contribuir)
3. [Estándares de Código](#estándares-de-código)
4. [Proceso de Desarrollo](#proceso-de-desarrollo)
5. [Estructura del Proyecto](#estructura-del-proyecto)

## Código de Conducta

Este proyecto y todos sus participantes están regidos por nuestro [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, se espera que respetes este código.

## Cómo Contribuir

### Reportar Bugs

1. Asegúrate de que el bug no haya sido reportado anteriormente
2. Usa la plantilla de issues para reportar bugs
3. Incluye pasos detallados para reproducir el problema
4. Añade capturas de pantalla si es posible

### Sugerir Mejoras

1. Describe claramente la mejora y su propósito
2. Explica cómo beneficiaría al proyecto
3. Proporciona ejemplos o mockups si es posible

### Pull Requests

1. Crea un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Estándares de Código

### Estilo de Código

- Usa TypeScript para todo el código
- Sigue las reglas de ESLint configuradas en el proyecto
- Usa Prettier para formatear el código
- Usa nombres descriptivos para variables y funciones

### React y Next.js

- Usa componentes funcionales y hooks
- Evita el uso de clases
- Usa `className` en lugar de `class`
- Valida todas las props con PropTypes o TypeScript
- Evita el uso de `any` en TypeScript

### CSS y Estilos

- Usa Tailwind CSS para estilos
- Sigue las variables CSS definidas en `globals.css`
- Mantén la estética gaming/cyberpunk
- Asegúrate de que todos los componentes sean responsivos

### Commits

- Usa mensajes de commit descriptivos
- Sigue el formato: `tipo(alcance): descripción`
- Tipos: feat, fix, docs, style, refactor, test, chore
- Ejemplo: `feat(navbar): add mobile menu animation`

## Proceso de Desarrollo

### Flujo de Trabajo

1. Selecciona una issue para trabajar
2. Crea una rama desde `main`
3. Desarrolla la feature o fix
4. Escribe tests si es necesario
5. Asegúrate de que pasa todos los tests
6. Crea un Pull Request
7. Espera la revisión y aprobación

### Testing

- Escribe tests para componentes nuevos
- Asegúrate de que los tests existentes pasan
- Prueba en diferentes navegadores y dispositivos

## Estructura del Proyecto

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

### Componentes

Los componentes deben seguir esta estructura:

```tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MyComponentProps {
  // Props definition
}

const MyComponent: React.FC<MyComponentProps> = ({ prop1, prop2 }) => {
  // Component logic

  return (
    <div className="my-component">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

## Agradecimientos

¡Gracias por contribuir a GameStore! Tu ayuda es invaluable para hacer de este proyecto algo increíble.