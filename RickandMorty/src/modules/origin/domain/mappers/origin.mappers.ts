import type { OriginDB } from "../entity/origin.interface";


export const originMappers = (Origin: OriginDB): OriginDB => {
    return {
        id: Origin.id || '',
        name: Origin.name || '',
    };
}