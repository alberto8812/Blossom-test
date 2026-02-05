# Rick and Morty App

Full-stack application built with React and NestJS that allows users to explore characters from the Rick and Morty universe.

## Project Structure

```
.
├── RickandMorty/          # Frontend (React + Vite)
├── rickand-morty-back/    # Backend (NestJS + GraphQL + Prisma)
└── README.md
```

## Features

- Browse all Rick and Morty characters
- View character details (species, status, origin)
- Add/remove characters from favorites
- Filter characters by name, species, status, and origin
- Add comments to characters
- Responsive design (mobile and desktop)

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TanStack Query (React Query)
- Zustand (State Management)
- Apollo Client (GraphQL)
- Tailwind CSS
- React Router
- Vitest (Testing)

### Backend
- NestJS
- GraphQL (Apollo Server)
- Prisma ORM
- PostgreSQL
- Redis (Caching)
- Docker

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm
- Docker & Docker Compose

### 1. Clone the repository
```bash
git clone <repository-url>
cd new
```

### 2. Start the backend
```bash
cd rickand-morty-back
pnpm install
docker-compose up -d  # Start PostgreSQL and Redis
pnpm prisma migrate dev
pnpm run start:dev
```

### 3. Start the frontend
```bash
cd RickandMorty
pnpm install
pnpm run dev
```

### 4. Open the app
- Frontend: http://localhost:5173
- GraphQL Playground: http://localhost:3000/graphql

## Environment Variables

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
pnpm test        # Run tests in watch mode
pnpm test --run  # Run tests once
```

### Backend
```bash
cd rickand-morty-back
pnpm test
pnpm test:e2e
```

## API Documentation

The GraphQL API is available at `/graphql` with the following main operations:

### Queries
- `get_all_character` - Get all characters with filters
- `get_one_character(id)` - Get character by ID

### Mutations
- `updateCharacter(input)` - Update character comment

