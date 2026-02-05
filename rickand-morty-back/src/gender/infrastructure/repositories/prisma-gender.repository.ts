import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma-manager.service';
import { Gender } from 'src/gender/domain/model/gender.model';
import { IGenderRepository, IResponse } from 'src/gender/domain/repositories/gender.repository.interface';


const includeRelations = {
  origin: true,
  species: true,
};

@Injectable()
export class PrismaGenderRepository implements IGenderRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<IResponse<Gender[]>> {

    const data = await this.prisma.gender.findMany();

    return {
      message: 'Characters retrieved successfully',
      code: 200,
      data,
    };
  }


}
