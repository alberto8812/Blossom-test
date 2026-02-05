import { Origin } from "../model/origin.model";


export const ORIGIN_REPOSITORY = 'ORIGIN_REPOSITORY';

export interface IOriginRepository {
    findAll(): Promise<IResponse<Origin[]>>;
}

export interface IResponse<T> {
    message: string;
    code: number;
    data: T[] | T;
}