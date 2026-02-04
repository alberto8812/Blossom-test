import { Character } from '../model/character.model';
import { SearchFilterCharacter } from '../../application/interfaces/search-filter-character.interface';

export const CHARACTER_REPOSITORY = 'CHARACTER_REPOSITORY';

export interface ICharacterRepository {
  findAll(): Promise<Character[]>;
  findById(id: string): Promise<Character | null>;
  create(data: Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Character>;
  update(id: string, data: Partial<Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Character>;
  softDelete(id: string): Promise<Character>;
  search(filters: SearchFilterCharacter): Promise<Character[]>;
}
