import { ArgsType, Field } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";




@ArgsType()
export class SearchCharacterArgs {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    name?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    status?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    originId?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    speciesId?: string;

}


