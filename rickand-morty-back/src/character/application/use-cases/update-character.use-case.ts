import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CHARACTER_REPOSITORY, ICharacterRepository } from '../../domain/repository/character.repository.interface';
import { UpdateCharacterInput } from '../dto/update-character.input';
import { Character } from '../../domain/model/character.model';

@Injectable()
export class UpdateCharacterUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
  ) {}

  async execute(input: UpdateCharacterInput): Promise<Character> {
    const { id, ...data } = input;
    const existing = await this.characterRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
    return this.characterRepository.update(id, data);
  }
}
