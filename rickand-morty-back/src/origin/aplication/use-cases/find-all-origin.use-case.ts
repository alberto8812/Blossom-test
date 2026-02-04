import { Inject, Injectable } from "@nestjs/common";
import { ORIGIN_REPOSITORY, IOriginRepository } from "src/origin/domain/repositories/origin.repository.interface";
import { Origin } from "src/origin/domain/model/origin.model";



@Injectable()
export class FindAllOriginUseCase {
    constructor(
        @Inject(ORIGIN_REPOSITORY)
        private readonly originRepository: IOriginRepository
    ) { }
    execute(): Promise<Origin[]> {
        return this.originRepository.findAll();
    }
}