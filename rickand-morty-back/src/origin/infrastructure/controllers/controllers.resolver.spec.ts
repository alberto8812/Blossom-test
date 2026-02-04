import { Test, TestingModule } from '@nestjs/testing';
import { ControllersResolver } from './controllers.resolver';

describe('ControllersResolver', () => {
  let resolver: ControllersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControllersResolver],
    }).compile();

    resolver = module.get<ControllersResolver>(ControllersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
