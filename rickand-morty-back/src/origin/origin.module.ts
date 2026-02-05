import { Module } from '@nestjs/common';
import { OriginResolver } from './infrastructure/controllers/controllers.resolver';
import { FindAllOriginUseCase } from './aplication/use-cases/find-all-origin.use-case';
import { ORIGIN_REPOSITORY } from './domain/repositories/origin.repository.interface';
import { PrismaOriginRepository } from './infrastructure/repositories/prisma-origin.repository';

@Module({
  providers: [

    OriginResolver,
    FindAllOriginUseCase,
    {
      provide: ORIGIN_REPOSITORY,
      useClass: PrismaOriginRepository,
    }

  ]
})
export class OriginModule { }
