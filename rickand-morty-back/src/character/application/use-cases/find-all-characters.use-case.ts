import { Inject, Injectable } from '@nestjs/common';
import { CHARACTER_REPOSITORY, ICharacterRepository } from '../../domain/repository/character.repository.interface';
import { Character } from '../../domain/model/character.model';
import { RedisCacheService } from '../../../shared/cache/redis-cache.service';
import { CHARACTER_CACHE_KEYS } from '../constants/cache-keys';

@Injectable()
export class FindAllCharactersUseCase {
  private readonly TTL_SECONDS = 600;

  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
    private readonly cacheService: RedisCacheService,
  ) {}

  async execute(): Promise<Character[]> {
    const cached = await this.cacheService.get<Character[]>(CHARACTER_CACHE_KEYS.FIND_ALL);
    if (cached) return cached;

    const characters = await this.characterRepository.findAll();
    await this.cacheService.set(CHARACTER_CACHE_KEYS.FIND_ALL, characters, this.TTL_SECONDS);
    return characters;
  }
}
