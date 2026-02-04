import { create } from "zustand"
import { CharacterEntity } from "../../../domain"


interface FavoritesCharacterStore {
    favorites: CharacterEntity[]
    countFavorites: number
    addFavoriteAndremoVe: (character: CharacterEntity) => void
}

export const useFavoritesCharacterStore = create<FavoritesCharacterStore>(
    (set) => ({
        favorites: [],
        countFavorites: 0,
        addFavoriteAndremoVe: (character) => {
            set((state) => {
                const findCharacter = state.favorites.find((fav) => fav.id === character.id)
                if (!findCharacter) {
                    return {
                        favorites: [...state.favorites, character], countFavorites: state.favorites.length + 1
                    }
                }
                const newFavorites = state.favorites.filter((fav) => fav.id !== character.id)
                return { favorites: newFavorites, countFavorites: newFavorites.length }
            })
        },
    })
)
