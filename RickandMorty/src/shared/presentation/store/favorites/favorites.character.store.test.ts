import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesCharacterStore } from './favorites.character.store';
import type { CharacterDB } from '../../../../modules/chatacters/domain/entity/character.interface.db';

const mockCharacter: CharacterDB = {
  id: '1',
  name: 'Rick Sanchez',
  species: 'Human',
  img: 'https://example.com/rick.png',
  status: 'Alive',
  origin: 'Earth',
};

const mockCharacter2: CharacterDB = {
  id: '2',
  name: 'Morty Smith',
  species: 'Human',
  img: 'https://example.com/morty.png',
  status: 'Alive',
  origin: 'Earth',
};

describe('useFavoritesCharacterStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useFavoritesCharacterStore.setState({
      favorites: [],
      countFavorites: 0,
    });
  });

  it('should start with empty favorites', () => {
    const { favorites, countFavorites } = useFavoritesCharacterStore.getState();

    expect(favorites).toEqual([]);
    expect(countFavorites).toBe(0);
  });

  it('should add a character to favorites', () => {
    const { addFavoriteAndremoVe } = useFavoritesCharacterStore.getState();

    addFavoriteAndremoVe(mockCharacter);

    const { favorites, countFavorites } = useFavoritesCharacterStore.getState();
    expect(favorites).toHaveLength(1);
    expect(favorites[0]).toEqual(mockCharacter);
    expect(countFavorites).toBe(1);
  });

  it('should remove a character from favorites if already exists', () => {
    const { addFavoriteAndremoVe } = useFavoritesCharacterStore.getState();

    // Add character
    addFavoriteAndremoVe(mockCharacter);
    expect(useFavoritesCharacterStore.getState().favorites).toHaveLength(1);

    // Remove character (toggle)
    addFavoriteAndremoVe(mockCharacter);

    const { favorites, countFavorites } = useFavoritesCharacterStore.getState();
    expect(favorites).toHaveLength(0);
    expect(countFavorites).toBe(0);
  });

  it('should add multiple characters to favorites', () => {
    const { addFavoriteAndremoVe } = useFavoritesCharacterStore.getState();

    addFavoriteAndremoVe(mockCharacter);
    addFavoriteAndremoVe(mockCharacter2);

    const { favorites, countFavorites } = useFavoritesCharacterStore.getState();
    expect(favorites).toHaveLength(2);
    expect(countFavorites).toBe(2);
  });

  it('should only remove the specific character when toggling', () => {
    const { addFavoriteAndremoVe } = useFavoritesCharacterStore.getState();

    // Add both characters
    addFavoriteAndremoVe(mockCharacter);
    addFavoriteAndremoVe(mockCharacter2);

    // Remove first character
    addFavoriteAndremoVe(mockCharacter);

    const { favorites, countFavorites } = useFavoritesCharacterStore.getState();
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toBe('2');
    expect(countFavorites).toBe(1);
  });
});
