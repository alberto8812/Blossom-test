import { Inject, Injectable } from '@nestjs/common';
import { CHARACTER_REPOSITORY, ICharacterRepository, IResponse } from '../../domain/repository/character.repository.interface';
import { SearchFilterCharacter } from '../interfaces/search-filter-character.interface';
import { Character } from '../../domain/model/character.model';


@Injectable()
export class SearchCharactersUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
  ) { }

  execute(filters: SearchFilterCharacter): Promise<IResponse<Character[]>> {
    return this.characterRepository.search(filters);
  }
}
