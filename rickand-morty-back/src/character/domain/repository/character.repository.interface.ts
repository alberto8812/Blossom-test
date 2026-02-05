import { Character } from '../model/character.model';
import { SearchFilterCharacter } from '../../application/interfaces/search-filter-character.interface';

export const CHARACTER_REPOSITORY = 'CHARACTER_REPOSITORY';

export interface ICharacterRepository {
  findAll(filter: SearchFilterCharacter): Promise<IResponse<Character[]>>;
  findById(id: string): Promise<IResponse<Character | null>>;
  create(data: Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'origin' | 'species'>): Promise<IResponse<Character>>;
  update(id: string, data: Partial<Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'origin' | 'species'>>): Promise<IResponse<Character>>;
  softDelete(id: string): Promise<IResponse<Character>>;
  search(filters: SearchFilterCharacter): Promise<IResponse<Character[]>>;
}

export interface IResponse<T> {
  message: string;
  code: number;
  data: T[] | T;
}