# Rick and Morty Backend

API GraphQL para gestionar personajes del universo Rick and Morty, construida con NestJS, Prisma, PostgreSQL y Redis.

## Stack tecnologico

| Tecnologia | Version | Uso |
|---|---|---|
| NestJS | 11 | Framework backend |
| GraphQL | 16 | API query language |
| Apollo Server | 5 | Servidor GraphQL |
| Prisma | 7 | ORM |
| PostgreSQL | 16 | Base de datos |
| Redis | 7 | Cache |
| ioredis | 5 | Cliente Redis |
| TypeScript | 5 | Lenguaje |

## Arquitectura

El proyecto sigue **Clean Architecture** con tres capas por modulo:

```
src/
├── config/
│   └── envs.ts                                    # Configuracion de entorno (Joi)
├── shared/
│   ├── cache/
│   │   ├── cache.module.ts                        # Modulo global de cache
│   │   └── redis-cache.service.ts                 # Servicio generico de Redis
│   ├── database/
│   │   ├── database.module.ts                     # Modulo global de base de datos
│   │   └── prisma-manager.service.ts              # Servicio de Prisma
│   ├── adapters/
│   │   └── http/
│   │       └── http.service.adapter.ts            # Cliente HTTP (Axios)
│   └── graphql/
│       ├── args/                                  # Args compartidos (pagination, search)
│       └── reponse/                               # Tipos de respuesta compartidos
├── character/
│   ├── domain/
│   │   ├── model/
│   │   │   └── character.model.ts                 # Entidad Character (ObjectType)
│   │   └── repository/
│   │       └── character.repository.interface.ts  # Contrato del repositorio
│   ├── application/
│   │   ├── constants/
│   │   │   └── cache-keys.ts                     # Claves de cache
│   │   ├── dto/
│   │   │   ├── create-character.input.ts
│   │   │   ├── update-character.input.ts
│   │   │   └── search-filter-character.input.ts
│   │   ├── interfaces/
│   │   │   └── search-filter-character.interface.ts
│   │   └── use-cases/
│   │       ├── find-all-characters.use-case.ts
│   │       ├── find-character-by-id.use-case.ts
│   │       ├── create-character.use-case.ts
│   │       ├── update-character.use-case.ts
│   │       ├── delete-character.use-case.ts
│   │       └── search-characters.use-case.ts
│   ├── infrastructure/
│   │   ├── controllers/
│   │   │   └── character.resolver.ts              # Resolver GraphQL
│   │   └── repositories/
│   │       └── prisma-character.repository.ts     # Implementacion Prisma
│   └── character.module.ts
├── gender/                                        # Misma estructura de capas
├── origin/                                        # Misma estructura de capas
├── app.module.ts
└── main.ts
```

### Capas

```
┌─────────────────────────────────────────────┐
│              Infrastructure                 │
│  Resolvers GraphQL, Repositorios Prisma     │
├─────────────────────────────────────────────┤
│              Application                    │
│  Use Cases, DTOs, Interfaces                │
├─────────────────────────────────────────────┤
│              Domain                         │
│  Modelos, Interfaces de Repositorio         │
└─────────────────────────────────────────────┘
```

- **Domain**: Modelos de entidad y contratos de repositorio. Sin dependencias externas.
- **Application**: Casos de uso con logica de negocio, DTOs para entrada/salida.
- **Infrastructure**: Implementaciones concretas (Prisma, GraphQL resolvers).

## Base de datos

### Diagrama de relaciones

```
┌──────────────────────────┐
│         origins          │
├──────────────────────────┤
│ id         UUID (PK)     │
│ name       VARCHAR       │
│ deleted_at TIMESTAMP?    │
├──────────────────────────┤
│ INDEX: name              │
│ INDEX: deleted_at        │
└──────────┬───────────────┘
           │
           │ 1:N
           │
┌──────────▼───────────────┐       ┌──────────────────────────┐
│       characters         │       │         genders          │
├──────────────────────────┤       ├──────────────────────────┤
│ id         UUID (PK)     │       │ id         UUID (PK)     │
│ name       VARCHAR       │       │ name       VARCHAR       │
│ status     VARCHAR       │       │ deleted_at TIMESTAMP?    │
│ origin_id  UUID (FK) ────┘       ├──────────────────────────┤
│ species_id UUID (FK) ───────────>│ INDEX: name              │
│ comment    VARCHAR?      │       │ INDEX: deleted_at        │
│ created_at TIMESTAMP     │       └──────────────────────────┘
│ updated_at TIMESTAMP     │
│ deleted_at TIMESTAMP?    │              N:1
├──────────────────────────┤
│ INDEX: name              │
│ INDEX: status            │
│ INDEX: origin_id         │
│ INDEX: species_id        │
│ INDEX: deleted_at        │
└──────────────────────────┘
```

### Relaciones

| Relacion | Tipo | Descripcion |
|---|---|---|
| Character -> Origin | N:1 | Cada personaje tiene un origen |
| Character -> Gender | N:1 | Cada personaje tiene un genero/especie |
| Origin -> Character | 1:N | Un origen tiene muchos personajes |
| Gender -> Character | 1:N | Un genero tiene muchos personajes |

### Soft Delete

Todas las tablas implementan soft delete mediante el campo `deleted_at`. Los registros no se eliminan fisicamente, solo se marca la fecha de eliminacion. Las consultas filtran automaticamente `deleted_at IS NULL`.

## API GraphQL

### Queries

```graphql
# Obtener todos los personajes (con cache Redis, TTL 10 min)
query {
  characters {
    id
    name
    status
    originId
    speciesId
    comment
    createdAt
    updatedAt
  }
}

# Obtener personaje por ID
query {
  character(id: "uuid") {
    id
    name
    status
  }
}

# Buscar personajes con filtros (case-insensitive)
query {
  searchCharacters(filters: {
    name: "Rick"
    status: "Alive"
  }) {
    id
    name
    status
  }
}

# Obtener todos los generos
query {
  genders {
    id
    name
  }
}
```

### Mutations

```graphql
# Crear personaje (invalida cache)
mutation {
  createCharacter(input: {
    name: "Rick Sanchez"
    status: "Alive"
    originId: "uuid"
    speciesId: "uuid"
    comment: "Scientist"
  }) {
    id
    name
  }
}

# Actualizar personaje (invalida cache)
mutation {
  updateCharacter(input: {
    id: "uuid"
    name: "Morty Smith"
  }) {
    id
    name
  }
}

# Eliminar personaje - soft delete (invalida cache)
mutation {
  deleteCharacter(id: "uuid") {
    id
    deletedAt
  }
}
```

## Cache (Redis)

El servicio `RedisCacheService` es generico y centralizado en `src/shared/cache/redis-cache.service.ts`.

### Metodos disponibles

| Metodo | Descripcion |
|---|---|
| `get<T>(key)` | Obtiene valor deserializado del cache |
| `set<T>(key, value, ttl?)` | Guarda valor serializado con TTL opcional (segundos) |
| `delete(key)` | Elimina una clave |
| `deleteByPattern(pattern)` | Elimina claves por patron usando SCAN (no bloqueante) |

### Estrategia de cache

- **FindAll Characters**: Cache-aside con TTL de 600 segundos (10 min)
- **Create/Update/Delete**: Invalidan todo el cache de characters (`characters:*`)

## Configuracion

### Variables de entorno

| Variable | Requerida | Default | Descripcion |
|---|---|---|---|
| `PORT` | Si | - | Puerto de la aplicacion |
| `DB_HOST` | Si | - | Host de PostgreSQL |
| `DB_PORT` | No | 5432 | Puerto de PostgreSQL |
| `DB_USERNAME` | Si | - | Usuario de PostgreSQL |
| `DB_PASSWORD` | Si | - | Password de PostgreSQL |
| `DB_NAME` | Si | - | Nombre de la base de datos |
| `DATABASE_URL` | Si | - | URL completa de conexion PostgreSQL |
| `API_URL` | Si | - | URL de la API externa de Rick and Morty |
| `REDIS_HOST` | No | localhost | Host de Redis |
| `REDIS_PORT` | No | 6379 | Puerto de Redis |

### Archivo `.env` de ejemplo

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=Blossom
DB_PASSWORD=123456
DB_NAME=Blossom
DATABASE_URL="postgresql://Blossom:123456@localhost:5432/Blossom?schema=public"
API_URL=https://rickandmortyapi.com/api
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Instalacion y ejecucion

### Requisitos previos

- Node.js >= 22
- pnpm
- Docker y Docker Compose

### Levantar infraestructura

```bash
docker compose up -d
```

Esto levanta PostgreSQL (puerto 5432) y Redis (puerto 6379).

### Instalar dependencias

```bash
pnpm install
```

### Generar cliente Prisma

```bash
pnpm prisma generate
```

### Ejecutar migraciones

```bash
pnpm prisma migrate dev
```

### Iniciar la aplicacion

```bash
# Desarrollo (watch mode)
pnpm run start:dev

# Produccion
pnpm run build
pnpm run start:prod
```

### Acceder a la API

Apollo Sandbox disponible en `http://localhost:3000/graphql`.

## Docker

El archivo `docker-compose.yml` define tres servicios:

| Servicio | Imagen | Puerto | Volumen |
|---|---|---|---|
| db | postgres:16-alpine | 5432 | postgres_data |
| redis | redis:7-alpine | 6379 | redis_data |
| app | Build local | 3000 | - |

```bash
# Levantar todo
docker compose up -d

# Solo infraestructura (DB + Redis)
docker compose up db redis -d

# Ver logs
docker compose logs -f app
```

## Scripts disponibles

| Script | Descripcion |
|---|---|
| `pnpm run start` | Iniciar la aplicacion |
| `pnpm run start:dev` | Iniciar en modo desarrollo (watch) |
| `pnpm run start:debug` | Iniciar en modo debug |
| `pnpm run build` | Compilar TypeScript |
| `pnpm run test` | Ejecutar tests unitarios |
| `pnpm run test:e2e` | Ejecutar tests end-to-end |
| `pnpm run test:cov` | Ejecutar tests con cobertura |
| `pnpm run lint` | Ejecutar ESLint |
| `pnpm run format` | Formatear codigo con Prettier |
