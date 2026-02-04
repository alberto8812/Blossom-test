import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma-manager.service';
import { ICharacterRepository } from '../../domain/repository/character.repository.interface';
import { Character } from '../../domain/model/character.model';
import { SearchFilterCharacter } from '../../application/interfaces/search-filter-character.interface';

const includeRelations = {
  origin: true,
  species: true,
};

@Injectable()
export class PrismaCharacterRepository implements ICharacterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Character[]> {
    return this.prisma.character.findMany({
      where: { deletedAt: null },
      include: includeRelations,
    });
  }

  async findById(id: string): Promise<Character | null> {
    return this.prisma.character.findFirst({
      where: { id, deletedAt: null },
      include: includeRelations,
    });
  }

  async create(data: Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'origin' | 'species'>): Promise<Character> {
    return this.prisma.character.create({
      data,
      include: includeRelations,
    });
  }

  async update(id: string, data: Partial<Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'origin' | 'species'>>): Promise<Character> {
    return this.prisma.character.update({
      where: { id },
      data,
      include: includeRelations,
    });
  }

  async softDelete(id: string): Promise<Character> {
    return this.prisma.character.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: includeRelations,
    });
  }

  async search(filters: SearchFilterCharacter): Promise<Character[]> {
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

    return this.prisma.character.findMany({
      where,
      include: includeRelations,
    });
  }
}
