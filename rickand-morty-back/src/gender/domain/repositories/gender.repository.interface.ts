import { Gender } from "../model/gender.model";

export const GENDER_REPOSITORY = 'GENDER_REPOSITORY';

export interface IGenderRepository {
    findAll(): Promise<Gender[]>;
}