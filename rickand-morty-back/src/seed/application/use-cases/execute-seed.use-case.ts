import { Inject, Injectable } from '@nestjs/common';
import { SEED_REPOSITORY, ISeedRepository } from '../../domain/repository/seed.repository.interface';
import { HttpServiceAdapter } from '../../../shared/adapters/http/http.service.adapter';
import { CharactersAPIData } from '../interfaces/characters-api.interface';
import { envs } from '../../../config/envs';
import { RedisCacheService } from '../../../shared/cache/redis-cache.service';

@Injectable()
export class ExecuteSeedUseCase {
  constructor(
    @Inject(SEED_REPOSITORY)
    private readonly seedRepository: ISeedRepository,
    private readonly httpServiceAdapter: HttpServiceAdapter,
    private readonly cacheService: RedisCacheService,
  ) {}

  async execute(): Promise<boolean> {
    await this.seedRepository.deleteAll();

    const url = `${envs.apiUrl}/character`;
    const charactersData = await this.httpServiceAdapter.get<CharactersAPIData>(url);
    const limitedData = charactersData.results.slice(0, 15);

    const uniqueOrigins = this.getUnique(
      limitedData.map((d) => ({ name: d.origin.name })),
    );
    const originsData = await this.seedRepository.createManyOrigins(uniqueOrigins);

    const uniqueSpecies = this.getUnique(
      limitedData.map((d) => ({ name: d.species })),
    );
    const gendersData = await this.seedRepository.createManyGenders(uniqueSpecies);

    const characters = limitedData.map((d) => ({
      name: d.name,
      status: d.status,
      originId: originsData.find((o) => o.name === d.origin.name)!.id,
      speciesId: gendersData.find((g) => g.name === d.species)!.id,
      img: d.image,
      comment: null,
    }));

    await this.seedRepository.createManyCharacters(characters);

    await this.cacheService.deleteByPattern('characters:*');

    return true;
  }

  private getUnique(items: { name: string }[]): { name: string }[] {
    return items.filter(
      (obj, index, self) => index === self.findIndex((o) => o.name === obj.name),
    );
  }
}
