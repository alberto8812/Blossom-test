import { Gender } from "../model/gender.model";

export const GENDER_REPOSITORY = 'GENDER_REPOSITORY';

export interface IGenderRepository {
    findAll(): Promise<IResponse<Gender[]>>;
}

export interface IResponse<T> {
    message: string;
    code: number;
    data: T[] | T;
}