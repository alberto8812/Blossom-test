import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CHARACTER_REPOSITORY, ICharacterRepository, IResponse } from '../../domain/repository/character.repository.interface';
import { Character } from '../../domain/model/character.model';
import { RedisCacheService } from '../../../shared/cache/redis-cache.service';
import { CHARACTER_CACHE_KEYS } from '../constants/cache-keys';

@Injectable()
export class DeleteCharacterUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
    private readonly cacheService: RedisCacheService,
  ) { }

  async execute(id: string): Promise<IResponse<Character>> {
    const existing = await this.characterRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
    const character = await this.characterRepository.softDelete(id);
    await this.cacheService.deleteByPattern(CHARACTER_CACHE_KEYS.PATTERN_ALL);
    return character;
  }
}
