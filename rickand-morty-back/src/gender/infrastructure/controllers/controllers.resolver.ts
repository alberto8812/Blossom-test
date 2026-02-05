import { Query, Resolver } from '@nestjs/graphql';
import { FindAllGenderUseCase } from 'src/gender/aplication/use-cases/find-all-gender.use-case';
import { GendersResponseObj } from '../graphql/output/gender-response.type';

@Resolver()
export class GenderResolver {

    constructor(
        private readonly findAllGenderUseCase: FindAllGenderUseCase,
    ) { }

    @Query(() => GendersResponseObj, { name: 'get_all_gender' })
    findAll() {
        return this.findAllGenderUseCase.execute();
    }
}
