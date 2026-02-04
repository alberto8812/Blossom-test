import { Module } from '@nestjs/common';
import { SeedResolver } from './infrastructure/controllers/seed.resolver';
import { PrismaSeedRepository } from './infrastructure/repositories/prisma-seed.repository';
import { SEED_REPOSITORY } from './domain/repository/seed.repository.interface';
import { ExecuteSeedUseCase } from './application/use-cases/execute-seed.use-case';
import { HttpServiceAdapter } from '../shared/adapters/http/http.service.adapter';

@Module({
  providers: [
    SeedResolver,
    {
      provide: SEED_REPOSITORY,
      useClass: PrismaSeedRepository,
    },
    ExecuteSeedUseCase,
    HttpServiceAdapter,
  ],
})
export class SeedModule {}
