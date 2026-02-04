import type { CharacterDB } from "../../entity/character.interface.db"


export const characterMappers = (Character: CharacterDB): Partial<CharacterDB> => {
    return {
        name: Character.name,
        specie: Character.specie,
        img: Character.img,
        id: Character.id

    }

}
export const characterDetailMappers = (Character: CharacterDB): CharacterDB => {
    return {
        name: Character.name,
        specie: Character.specie,
        img: Character.img,
        status: Character.status,
        origin: Character.origin,
        id: Character.id
    }

}