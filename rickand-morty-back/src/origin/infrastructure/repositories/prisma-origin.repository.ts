import { Injectable } from "@nestjs/common";
import { Gender } from "src/gender/domain/model/gender.model";
import { IGenderRepository, IResponse } from "src/gender/domain/repositories/gender.repository.interface";
import { PrismaService } from "src/shared/database/prisma-manager.service";


@Injectable()
export class PrismaOriginRepository implements IGenderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findAll(): Promise<IResponse<Gender[]>> {
        const data = await this.prisma.gender.findMany({
            where: { deletedAt: null }
        });
        return {
            message: 'Genders retrieved successfully',
            code: 200,
            data,
        };
    }

}