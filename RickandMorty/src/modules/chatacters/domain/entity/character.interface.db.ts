import type { ResponseDetailGeneric, ResponseGeneric } from "../../../../shared/domain/base/response.interface";

export interface ResponseCharacter {
    get_all_character: ResponseGeneric<CharacterDB>;
}
export interface ResponseCharacterId {
    get_one_character: ResponseDetailGeneric<CharacterDB>;
}

export interface CharacterDB {
    id: string;
    name: string;
    specie: string;
    img: string;
    status: string;
    origin: string;
}

