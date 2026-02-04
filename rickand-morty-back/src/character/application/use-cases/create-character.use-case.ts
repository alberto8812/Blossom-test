import { Inject, Injectable } from '@nestjs/common';
import { CHARACTER_REPOSITORY, ICharacterRepository, IResponse } from '../../domain/repository/character.repository.interface';
import { CreateCharacterInput } from '../dto/create-character.input';
import { Character } from '../../domain/model/character.model';
import { RedisCacheService } from '../../../shared/cache/redis-cache.service';
import { CHARACTER_CACHE_KEYS } from '../constants/cache-keys';

@Injectable()
export class CreateCharacterUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: ICharacterRepository,
    private readonly cacheService: RedisCacheService,
  ) { }

  async execute(input: CreateCharacterInput): Promise<IResponse<Character>> {
    try {
      const character = await this.characterRepository.create(input);
      await this.cacheService.deleteByPattern(CHARACTER_CACHE_KEYS.PATTERN_ALL);
      return {
        message: 'Character created successfully',
        code: 201,
        data: character.data,
      };
    } catch (error) {
      return {
        message: 'Error creating character',
        code: 500,
        data: [],
      };
    }
  }
}
