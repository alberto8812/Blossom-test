import type { CharacterDB, CharacterRaw } from "../../entity/character.interface.db"

export const characterMappers = (character: CharacterRaw): CharacterDB => {
    return {
        id: character.id,
        name: character.name,
        status: character.status,
        img: character.img,
        origin: character.origin?.name ?? '',
        species: character.species?.name ?? '',
    }
}
export const characterDetailMappers = (Character: CharacterRaw): CharacterDB => {
    return {
        comment: Character?.comment ?? '',
        name: Character.name,
        species: Character.species?.name ?? '',
        img: Character.img,
        status: Character.status,
        origin: Character.origin?.name ?? '',
        id: Character.id
    }

}