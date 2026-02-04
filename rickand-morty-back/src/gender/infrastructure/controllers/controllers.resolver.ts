import { Query, Resolver } from '@nestjs/graphql';
import { FindAllGenderUseCase } from 'src/gender/aplication/use-cases/find-all-gender.use-case';
import { Gender } from 'src/gender/domain/model/gender.model';

@Resolver()
export class GenderResolver {

    constructor(
        private readonly findAllGenderUseCase: FindAllGenderUseCase,
    ) { }

    @Query(() => [Gender], { name: 'genders' })
    findAll() {
        return this.findAllGenderUseCase.execute();
    }
}
