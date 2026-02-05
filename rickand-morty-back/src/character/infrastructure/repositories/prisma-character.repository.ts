import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma-manager.service';
import { ICharacterRepository, IResponse } from '../../domain/repository/character.repository.interface';
import { Character } from '../../domain/model/character.model';
import { SearchFilterCharacter } from '../../application/interfaces/search-filter-character.interface';

const includeRelations = {
  origin: true,
  species: true,
};

@Injectable()
export class PrismaCharacterRepository implements ICharacterRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(filter: SearchFilterCharacter): Promise<IResponse<Character[]>> {
    const where: Record<string, unknown> = { deletedAt: null };

    const conditions = {
      name: () => where.name = { contains: filter.name, mode: 'insensitive' },
      status: () => where.status = { contains: filter.status, mode: 'insensitive' },
      originId: () => where.originId = filter.originId,
      speciesId: () => where.speciesId = filter.speciesId,
    }

    const conditionKeys = Object.keys(filter) as (keyof typeof conditions)[];

    conditionKeys.forEach((key) => {
      if (filter[key]) {
        conditions[key]()
      }
    })
    const data = await this.prisma.character.findMany({
      where,
      include: includeRelations,
    });

    return {
      message: 'Characters retrieved successfully',
      code: 200,
      data,
    };
  }

  async findById(id: string): Promise<IResponse<Character | null>> {
    const data = await this.prisma.character.findFirst({
      where: { id, deletedAt: null },
      include: includeRelations,
    });

    return {
      message: 'Character retrieved successfully',
      code: 200,
      data,
    };
  }

  async create(data: Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'origin' | 'species'>): Promise<IResponse<Character>> {
    const createdCharacter = await this.prisma.character.create({
      data,
      include: includeRelations,
    });

    return {
      message: 'Character created successfully',
      code: 201,
      data: createdCharacter,
    };
  }

  async update(id: string, data: Partial<Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'origin' | 'species'>>): Promise<IResponse<Character>> {
    const updatedCharacter = await this.prisma.character.update({
      where: { id },
      data,
      include: includeRelations,
    });

    return {
      message: 'Character updated successfully',
      code: 200,
      data: updatedCharacter,
    };
  }

  async softDelete(id: string): Promise<IResponse<Character>> {
    const updatedCharacter = await this.prisma.character.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: includeRelations,
    });

    return {
      message: 'Character soft deleted successfully',
      code: 200,
      data: updatedCharacter,
    };
  }

  async search(filters: SearchFilterCharacter): Promise<IResponse<Character[]>> {
    const where: any = { deletedAt: null };

    if (filters.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }
    if (filters.status) {
      where.status = { contains: filters.status, mode: 'insensitive' };
    }
    if (filters.originId) {
      where.originId = filters.originId;
    }
    if (filters.speciesId) {
      where.speciesId = filters.speciesId;
    }
    if (filters.comment) {
      where.comment = { contains: filters.comment, mode: 'insensitive' };
    }

    const data = await this.prisma.character.findMany({
      where,
      include: includeRelations,
    });

    return {
      message: 'Characters retrieved successfully',
      code: 200,
      data,
    };
  }
}
