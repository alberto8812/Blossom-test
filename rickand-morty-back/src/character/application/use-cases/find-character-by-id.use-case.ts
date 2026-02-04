import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CHARACTER_REPOSITORY, ICharacterRepository, IResponse } from '../../domain/repository/character.repository.interface';
import { Character } from '../../domain/model/character.model';

@Injectable()
export class FindCharacterByIdUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
  ) { }

  async execute(id: string): Promise<IResponse<Character>> {
    const character = await this.characterRepository.findById(id);
    if (!character || !character.data) {
      return {
        message: `Character with id ${id} not found`,
        code: 404,
        data: [],
      }
    }
    return character as IResponse<Character>;
  }
}
