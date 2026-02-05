import { Inject, Injectable } from "@nestjs/common";
import { Gender } from "src/gender/domain/model/gender.model";


import { GENDER_REPOSITORY, IGenderRepository, IResponse } from "src/gender/domain/repositories/gender.repository.interface";



@Injectable()
export class FindAllGenderUseCase {
    constructor(
        @Inject(GENDER_REPOSITORY)
        private readonly genderRepository: IGenderRepository
    ) { }
    execute(): Promise<IResponse<Gender[]>> {
        return this.genderRepository.findAll();
    }
}