import { Mutation, Resolver } from '@nestjs/graphql';
import { ExecuteSeedUseCase } from '../../application/use-cases/execute-seed.use-case';

@Resolver()
export class SeedResolver {
  constructor(private readonly executeSeedUseCase: ExecuteSeedUseCase) {}

  @Mutation(() => Boolean, { description: 'Ejecuta el seed con datos de la API de Rick and Morty' })
  async executeSeed(): Promise<boolean> {
    return this.executeSeedUseCase.execute();
  }
}
