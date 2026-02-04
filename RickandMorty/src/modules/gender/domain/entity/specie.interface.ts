import type { ResponseGeneric } from "../../../../shared/domain/base/response.interface";


export interface GenderResponse {
    get_all_gender: ResponseGeneric<SpecieDB>;
}


export interface SpecieDB {
    id: string;
    name: NameGender;
}
type NameGender = "Alien" | "Human";