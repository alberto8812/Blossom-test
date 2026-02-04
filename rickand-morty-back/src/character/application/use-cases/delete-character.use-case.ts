import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CHARACTER_REPOSITORY, ICharacterRepository } from '../../domain/repository/character.repository.interface';
import { Character } from '../../domain/model/character.model';

@Injectable()
export class DeleteCharacterUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
  ) {}

  async execute(id: string): Promise<Character> {
    const existing = await this.characterRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
    return this.characterRepository.softDelete(id);
  }
}
