# Rick and Morty

Aplicacion web para explorar personajes del universo Rick and Morty. Permite buscar, filtrar y guardar personajes favoritos con una interfaz responsive y animaciones GSAP.

## Tech Stack

| Categoria | Tecnologia |
|-----------|-----------|
| Framework | React 18.3 + TypeScript 5.9 |
| Build | Vite 7.2 |
| Estilos | Tailwind CSS 4.1 |
| Estado global | Zustand 5.0 |
| Data fetching | Apollo Client 4.1 + React Query 5.9 |
| Routing | React Router DOM 7.13 |
| Animaciones | GSAP 3.14 + @gsap/react 2.1 |
| Iconos | React Icons 5.5 |

## Requisitos previos

- Node.js >= 18
- pnpm (recomendado) o npm
- Backend GraphQL corriendo en `http://localhost:3000/graphql`

## Instalacion

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env si el backend usa otro puerto
```

## Variables de entorno

```env
VITE_GRAPHQL_URL=http://localhost:3000/graphql
```

## Scripts

```bash
pnpm dev        # Servidor de desarrollo
pnpm build      # Build de produccion (tsc + vite)
pnpm preview    # Preview del build
pnpm lint       # Ejecutar ESLint
```

## Estructura del proyecto

```
src/
├── components/                # Componentes compartidos
│   ├── Accordion.tsx
│   └── SearchSideMenu.tsx
├── modules/
│   └── chatacters/
│       ├── api/               # Llamadas GraphQL
│       │   ├── get-all-characters.ts
│       │   └── graphql/
│       ├── components/ui/     # Componentes UI del modulo
│       │   ├── cards/         # ProfileCard
│       │   ├── layouts/       # DashBoardCharactersLayout
│       │   └── sideMenu/      # SideMenu, ModalFilterSidebar
│       ├── domain/            # Entidades, interfaces, mappers
│       │   ├── entity/
│       │   └── mappers/
│       └── presentation/      # Paginas
│           ├── Character.page.tsx
│           └── intro.page.tsx
├── shared/
│   ├── domain/base/           # Interfaces base (response, filters)
│   └── presentation/
│       ├── graphql/           # Configuracion Apollo Client
│       ├── handkeErrors/      # Error boundary, PageError
│       ├── hooks/             # useSelectPetitionModule
│       ├── layouts/           # DashBoardLayout
│       ├── router/            # Configuracion React Router
│       └── store/             # Zustand stores
│           ├── favorites/     # Personajes favoritos
│           └── filterShare/   # Estado de filtros
├── App.tsx
├── main.tsx
└── index.css                  # Design tokens (CSS variables)
```

## Arquitectura

El proyecto sigue una **arquitectura modular por capas**:

- **domain/** — Entidades, interfaces y mappers. Sin dependencias de framework.
- **api/** — Queries GraphQL y funciones de fetch.
- **presentation/** — Paginas, componentes UI, hooks, stores.
- **shared/** — Codigo reutilizable entre modulos.

### Flujo de datos

```
GraphQL API → Apollo Client → React Query (cache) → Componentes
                                                   ↕
                                              Zustand (favoritos, filtros)
```

## Rutas

| Ruta | Descripcion |
|------|-------------|
| `/dashboard` | Lista de personajes con sidebar |
| `/dashboard/characters/:id` | Detalle de un personaje |
| `/dashboard/Blossom` | Pagina intro con animacion GSAP |
| `/404` | Pagina de error |

## Funcionalidades

- **Lista de personajes** — Sidebar con busqueda por nombre y scroll independiente
- **Favoritos** — Toggle con corazon, seccion "Starred Characters" separada
- **Filtros avanzados** — Por tipo (All/Starred/Others) y especie (All/Human/Alien). En desktop aparece como dropdown, en mobile como pagina completa
- **Detalle de personaje** — Vista con avatar, especie, estado y origen. En mobile incluye boton de retroceso
- **Responsive** — Sidebar colapsable en mobile, layouts adaptados por breakpoint
- **Animaciones** — Intro con GSAP usando `useGSAP` hook (scatter → settle → idle float)
- **Error handling** — Error boundary global con fallback visual

## Design Tokens

Los tokens se definen como CSS variables en `src/index.css`:

```css
--accent: #5A3696        /* Purple principal */
--accent-light: #EDE8F5  /* Purple claro (filtros activos, hover) */
--accent-heart: #48BB78  /* Verde para favoritos */
--text-primary: #1a1a2e
--text-secondary: #6b7280
--text-muted: #9ca3af
--border-light: #f0f0f0
--surface: #ffffff
--surface-hover: #f9f8fc
```

## GraphQL

```graphql
query GetAllCharacters {
  get_all_character {
    code
    message
    data {
      id, name, status, img
      origin { name }
      species { name }
    }
  }
}
```

## Modelo de datos

```typescript
// Respuesta cruda de la API
interface CharacterRaw {
  id: string;
  name: string;
  status: string;
  img: string;
  origin: { name: string };
  species: { name: string };
}

// Modelo interno (post-mapper)
interface CharacterDB {
  id: string;
  name: string;
  species: string;
  img: string;
  status: string;
  origin: string;
}
```

## Stores (Zustand)

**Favorites Store** — Gestiona personajes favoritos:
- `favorites: CharacterDB[]`
- `countFavorites: number`
- `addFavoriteAndremoVe(character)` — Toggle agregar/eliminar

**Filter Store** — Gestiona el estado de busqueda y filtros:
- `specieFilter`, `originFilter`, `characterFilter`, `name`
- Metodos para actualizar cada filtro y validar antes de aplicar
