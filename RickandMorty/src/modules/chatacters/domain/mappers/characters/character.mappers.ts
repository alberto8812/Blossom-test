import type { CharacterDB, CharacterRaw } from "../../entity/character.interface.db"

export const characterMappers = (character: CharacterRaw): CharacterDB => {
    return {
        id: character.id,
        name: character.name,
        status: character.status,
        img: character.img,
        origin: character.origin?.name ?? '',
        specie: character.specie?.name ?? '',
    }
}