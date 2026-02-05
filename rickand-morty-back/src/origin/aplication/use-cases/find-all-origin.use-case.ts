import { Inject, Injectable } from "@nestjs/common";
import { ORIGIN_REPOSITORY, IOriginRepository, IResponse } from "src/origin/domain/repositories/origin.repository.interface";
import { Origin } from "src/origin/domain/model/origin.model";



@Injectable()
export class FindAllOriginUseCase {
    constructor(
        @Inject(ORIGIN_REPOSITORY)
        private readonly originRepository: IOriginRepository
    ) { }
    execute(): Promise<IResponse<Origin[]>> {
        return this.originRepository.findAll();
    }
}