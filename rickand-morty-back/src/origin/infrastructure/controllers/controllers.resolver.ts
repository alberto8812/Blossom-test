import { Query, Resolver } from '@nestjs/graphql';
import { FindAllOriginUseCase } from 'src/origin/aplication/use-cases/find-all-origin.use-case';
import { OriginsResponseObj } from '../graphql/output/origin-response.type';

@Resolver()
export class OriginResolver {
    constructor(
        private readonly findAllOriginUseCase: FindAllOriginUseCase,
    ) { }
    @Query(() => OriginsResponseObj, { name: 'get_all_origins' })
    findAll() {
        return this.findAllOriginUseCase.execute();
    }


}
