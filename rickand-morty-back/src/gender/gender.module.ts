import { Module } from "@nestjs/common";
import { GenderResolver } from "./infrastructure/controllers/controllers.resolver";
import { FindAllGenderUseCase } from "./aplication/use-cases/find-all-gender.use-case";
import { GENDER_REPOSITORY } from "./domain/repositories/gender.repository.interface";
import { PrismaGenderRepository } from "./infrastructure/repositories/prisma-gender.repository";


@Module({
    providers: [
        GenderResolver,
        {
            provide: GENDER_REPOSITORY,
            useClass: PrismaGenderRepository, // Make sure to implement PrismaGenderRepository
        },
        FindAllGenderUseCase,

    ],
})

export class GenderModule { }