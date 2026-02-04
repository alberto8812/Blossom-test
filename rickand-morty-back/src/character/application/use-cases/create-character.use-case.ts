import { Inject, Injectable } from '@nestjs/common';
import { CHARACTER_REPOSITORY, ICharacterRepository } from '../../domain/repository/character.repository.interface';
import { CreateCharacterInput } from '../dto/create-character.input';
import { Character } from '../../domain/model/character.model';

@Injectable()
export class CreateCharacterUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
  ) {}

  execute(input: CreateCharacterInput): Promise<Character> {
    return this.characterRepository.create(input);
  }
}
