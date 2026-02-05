import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CHARACTER_REPOSITORY, ICharacterRepository, IResponse } from '../../domain/repository/character.repository.interface';
import { UpdateCharacterInput } from '../dto/update-character.input';
import { Character } from '../../domain/model/character.model';
import { RedisCacheService } from '../../../shared/cache/redis-cache.service';
import { CHARACTER_CACHE_KEYS } from '../constants/cache-keys';

@Injectable()
export class UpdateCharacterUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
    private readonly cacheService: RedisCacheService,
  ) { }

  async execute(input: UpdateCharacterInput): Promise<Character> {
    const { id, comment } = input;
    const existing = await this.characterRepository.findById(id);
    if (!existing.data) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
    const character = await this.characterRepository.update(id, { comment });
    await this.cacheService.deleteByPattern(CHARACTER_CACHE_KEYS.PATTERN_ALL);
    return character.data as Character;
  }
}
