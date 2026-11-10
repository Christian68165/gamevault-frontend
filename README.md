# GameVault

SPA en React + Vite + Tailwind CSS para administrar un catálogo de videojuegos (juegos, plataformas y géneros) consumiendo una API REST. Incluye un visor 3D con `@react-three/fiber` y `@react-three/drei`.

## Configuración

```bash
cp .env.example .env   # VITE_API_URL=https://proyecto-final-productos.onrender.com/api/v1
npm install
npm run dev
```

## Estructura

```
src/
  services/api.js            # fetch + manejo de errores
  components/
    Sidebar.jsx, ui.jsx, SectionHeader.jsx
    games/      GamesSection, GameForm, GameViewer3D, GameGrid, GameCard
    platforms/  PlatformsSection, PlatformForm, PlatformList
    genres/     GenresSection, GenreForm, GenreList
```
