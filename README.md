# Rick and Morty App

Aplicacion full-stack construida con React y NestJS que permite explorar personajes del universo Rick and Morty.

## Estructura del Proyecto

```
.
├── RickandMorty/          # Frontend (React + Vite)
├── rickand-morty-back/    # Backend (NestJS + GraphQL + Prisma)
└── README.md
```

## Funcionalidades

- Explorar todos los personajes de Rick and Morty
- Ver detalles del personaje (especie, estado, origen)
- Agregar/quitar personajes de favoritos
- Filtrar personajes por nombre, especie, estado y origen
- Agregar comentarios a los personajes
- Diseno responsive (mobile y desktop)

## Stack Tecnologico

### Frontend
- React 18
- TypeScript
- Vite
- TanStack Query (React Query)
- Zustand (Manejo de estado)
- Apollo Client (GraphQL)
- Tailwind CSS
- React Router
- Vitest (Testing)

### Backend
- NestJS
- GraphQL (Apollo Server)
- Prisma ORM
- PostgreSQL
- Redis (Cache)
- Docker

## Inicio Rapido

### Requisitos previos
- Node.js 18+
- pnpm
- Docker y Docker Compose

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd new
```

### 2. Iniciar el backend
```bash
cd rickand-morty-back
pnpm install
docker-compose up -d  # Inicia PostgreSQL y Redis
pnpm prisma migrate dev
pnpm run start:dev
```

### 3. Iniciar el frontend
```bash
cd RickandMorty
pnpm install
pnpm run dev
```

### 4. Abrir la aplicacion
- Frontend: http://localhost:5173
- GraphQL Playground: http://localhost:3000/graphql

## Variables de Entorno

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5433/dbname"
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Testing

### Frontend
```bash
cd RickandMorty
pnpm test        # Ejecutar tests en modo watch
pnpm test --run  # Ejecutar tests una vez
```

### Backend
```bash
cd rickand-morty-back
pnpm test
pnpm test:e2e
```

## Documentacion de la API

La API GraphQL esta disponible en `/graphql` con las siguientes operaciones principales:

### Queries
- `get_all_character` - Obtener todos los personajes con filtros
- `get_one_character(id)` - Obtener personaje por ID

### Mutations
- `updateCharacter(input)` - Actualizar comentario del personaje
