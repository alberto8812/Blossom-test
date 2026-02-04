import { Module } from '@nestjs/common';
import { CharacterResolver } from './infrastructure/controllers/character.resolver';
import { PrismaCharacterRepository } from './infrastructure/repositories/prisma-character.repository';
import { CHARACTER_REPOSITORY } from './domain/repository/character.repository.interface';
import { FindAllCharactersUseCase } from './application/use-cases/find-all-characters.use-case';
import { FindCharacterByIdUseCase } from './application/use-cases/find-character-by-id.use-case';
import { CreateCharacterUseCase } from './application/use-cases/create-character.use-case';
import { UpdateCharacterUseCase } from './application/use-cases/update-character.use-case';
import { DeleteCharacterUseCase } from './application/use-cases/delete-character.use-case';
import { SearchCharactersUseCase } from './application/use-cases/search-characters.use-case';

@Module({
  providers: [
    CharacterResolver,
    {
      provide: CHARACTER_REPOSITORY,
      useClass: PrismaCharacterRepository,
    },
    FindAllCharactersUseCase,
    FindCharacterByIdUseCase,
    CreateCharacterUseCase,
    UpdateCharacterUseCase,
    DeleteCharacterUseCase,
    SearchCharactersUseCase,
  ],
})
export class CharacterModule {}
