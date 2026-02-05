import { Injectable } from "@nestjs/common";
import { Origin } from "src/origin/domain/model/origin.model";

import { IOriginRepository, IResponse } from "src/origin/domain/repositories/origin.repository.interface";
import { PrismaService } from "src/shared/database/prisma-manager.service";


@Injectable()
export class PrismaOriginRepository implements IOriginRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findAll(): Promise<IResponse<Origin[]>> {
        const data = await this.prisma.origin.findMany({
            where: { deletedAt: null }
        });
        return {
            message: 'Origins retrieved successfully',
            code: 200,
            data,
        };
    }

}