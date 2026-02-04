import { Injectable } from "@nestjs/common";
import { SearchFilterCharacter } from "src/character/application/interfaces/search-filter-character.interface";
import { Character } from "src/character/domain/model/character.model";
import { ICharacterRepository } from "src/character/domain/repository/character.repository.interface";
import { Gender } from "src/gender/domain/model/gender.model";
import { IGenderRepository } from "src/gender/domain/repositories/gender.repository.interface";
import { PrismaService } from "src/shared/database/prisma-manager.service";

@Injectable()
export class PrismaGenderRepository implements IGenderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    findAll(): Promise<Gender[]> {
        return this.prisma.gender.findMany({
            where: { deletedAt: null }
        });
    }

}