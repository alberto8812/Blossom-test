import { create } from "zustand"
import { CharacterFilter, NameFilter } from "../../../domain"


interface FieldFileterShare {
    specieFilter: CharacterFilter
    originFilter: CharacterFilter
    characterFilter: CharacterFilter
    name: CharacterFilter
    setOriginCharacterFilter: (characterFilters?: CharacterFilter) => void
    setSpeciesCharacterFilter: (characterFilters?: CharacterFilter) => void
    setValidatedFieldFilter: () => void
    setNameCharacterFilter: (nameFilter?: CharacterFilter) => void

}

export const useFilterSharestore = create<FieldFileterShare>()(
    (set, get) => ({

        specieFilter: {},
        originFilter: {},
        characterFilter: {},
        name: {},
        setValidatedFieldFilter: () => {
            const newEspecieFilter = { ...get().specieFilter }
            const newOriginFilter = { ...get().originFilter }
            const name = { ...get().name }

            if (name.name === "") {
                delete name.name
            }

            if (newEspecieFilter.speciesId === "all") {
                delete newEspecieFilter.speciesId
            }
            if (newOriginFilter.originId === "all") {
                delete newOriginFilter.originId
            }
            set({ characterFilter: { ...newEspecieFilter, ...newOriginFilter } })

        },
        setOriginCharacterFilter: (characterFilters?: CharacterFilter) => {
            set({ originFilter: characterFilters })
        },
        setSpeciesCharacterFilter: (characterFilters?: CharacterFilter) => {
            set({ specieFilter: characterFilters })
        },
        setNameCharacterFilter: (nameFilter?: CharacterFilter) => {
            set({ name: nameFilter })
        }

    })

)