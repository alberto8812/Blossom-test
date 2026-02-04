import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma-manager.service';
import { ISeedRepository } from '../../domain/repository/seed.repository.interface';
import { Character, Gender, Origin } from 'generated/prisma/client';

@Injectable()
export class PrismaSeedRepository implements ISeedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteAll(): Promise<void> {
    await this.prisma.character.deleteMany();
    await this.prisma.gender.deleteMany();
    await this.prisma.origin.deleteMany();
  }

  async createManyOrigins(data: { name: string }[]): Promise<Origin[]> {
    const origins: Origin[] = [];
    for (const item of data) {
      const origin = await this.prisma.origin.create({ data: item });
      origins.push(origin);
    }
    return origins;
  }

  async createManyGenders(data: { name: string }[]): Promise<Gender[]> {
    const genders: Gender[] = [];
    for (const item of data) {
      const gender = await this.prisma.gender.create({ data: item });
      genders.push(gender);
    }
    return genders;
  }

  async createManyCharacters(data: Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>[]): Promise<Character[]> {
    const characters: Character[] = [];
    for (const item of data) {
      const character = await this.prisma.character.create({ data: item });
      characters.push(character);
    }
    return characters;
  }
}
