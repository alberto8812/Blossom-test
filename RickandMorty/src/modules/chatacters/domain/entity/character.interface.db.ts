import type { ResponseDetailGeneric, ResponseGeneric } from "../../../../shared/domain/base/response.interface";

export interface CharacterRaw {
    id: string;
    name: string;
    status: string;
    img: string;
    comment?: string;
    origin: { name: string };
    species: { name: string };
}

export interface ResponseCharacter {
    get_all_character: ResponseGeneric<CharacterRaw>;
}
export interface ResponseCharacterId {
    get_one_character: ResponseDetailGeneric<CharacterRaw>;
}

export interface CharacterDB {
    id: string;
    name: string;
    species: string;
    img: string;
    status: string;
    origin: string;
    comment?: string;
}

