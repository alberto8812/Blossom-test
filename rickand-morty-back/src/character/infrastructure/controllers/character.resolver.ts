import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Character } from '../../domain/model/character.model';
import { CreateCharacterInput } from '../../application/dto/create-character.input';
import { UpdateCharacterInput } from '../../application/dto/update-character.input';
import { SearchFilterCharacterInput } from '../../application/dto/search-filter-character.input';
import { FindAllCharactersUseCase } from '../../application/use-cases/find-all-characters.use-case';
import { FindCharacterByIdUseCase } from '../../application/use-cases/find-character-by-id.use-case';
import { CreateCharacterUseCase } from '../../application/use-cases/create-character.use-case';
import { UpdateCharacterUseCase } from '../../application/use-cases/update-character.use-case';
import { DeleteCharacterUseCase } from '../../application/use-cases/delete-character.use-case';
import { SearchCharactersUseCase } from '../../application/use-cases/search-characters.use-case';
import { CharactersResponseObj } from '../graphql/output/character-response.type';
import { SearchCharacterArgs } from '../graphql/args/search.characters';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(
    private readonly findAllUseCase: FindAllCharactersUseCase,
    private readonly findByIdUseCase: FindCharacterByIdUseCase,
    private readonly createUseCase: CreateCharacterUseCase,
    private readonly updateUseCase: UpdateCharacterUseCase,
    private readonly deleteUseCase: DeleteCharacterUseCase,
    private readonly searchUseCase: SearchCharactersUseCase,
  ) { }

  @Query(() => CharactersResponseObj, { name: 'get_all_character' })
  findAll(@Args() searchCharacterArgs: SearchCharacterArgs) {
    return this.findAllUseCase.execute(searchCharacterArgs);
  }

  @Query(() => Character, { name: 'character' })
  findOne(@Args('id') id: string) {
    return this.findByIdUseCase.execute(id);
  }

  @Query(() => [Character], { name: 'searchCharacters' })
  search(@Args('filters') filters: SearchFilterCharacterInput) {
    return this.searchUseCase.execute(filters);
  }

  @Mutation(() => Character)
  createCharacter(@Args('input') input: CreateCharacterInput) {
    return this.createUseCase.execute(input);
  }

  @Mutation(() => Character)
  updateCharacter(@Args('input') input: UpdateCharacterInput) {
    return this.updateUseCase.execute(input);
  }

  @Mutation(() => Character)
  deleteCharacter(@Args('id') id: string) {
    return this.deleteUseCase.execute(id);
  }
}
