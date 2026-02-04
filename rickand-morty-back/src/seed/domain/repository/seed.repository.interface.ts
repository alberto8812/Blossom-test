import { Character, Gender, Origin } from 'generated/prisma/client';

export const SEED_REPOSITORY = 'SEED_REPOSITORY';

export interface ISeedRepository {
  deleteAll(): Promise<void>;
  createManyOrigins(data: { name: string }[]): Promise<Origin[]>;
  createManyGenders(data: { name: string }[]): Promise<Gender[]>;
  createManyCharacters(data: Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>[]): Promise<Character[]>;
}
