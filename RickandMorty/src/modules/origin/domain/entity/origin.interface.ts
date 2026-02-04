import type { ResponseGeneric } from "../../../../shared/domain/base/response.interface";


export interface ResponseOrigin {
    get_all_origin: ResponseGeneric<OriginDB>;
}

export interface OriginDB {
    id: string;
    name: string;
}

