import { Module } from '@nestjs/common';
import { ControllersResolver } from './infrastructure/controllers/controllers.resolver';

@Module({
  providers: [ControllersResolver]
})
export class OriginModule {}
