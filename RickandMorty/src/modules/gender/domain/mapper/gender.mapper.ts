import type { SpecieDB } from "../entity/specie.interface"


export const genderMappers = (gender: SpecieDB): SpecieDB => {
    return {
        id: gender.id,
        name: gender.name
    }
}