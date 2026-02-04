import { Field, ObjectType } from "@nestjs/graphql";

import { OriginRepositoryModelObj } from "./Origin.type";
import { basicResponseApiOutput } from "src/shared/graphql/reponse/reponse-api.output";


@ObjectType()
export class OriginsResponseObj extends basicResponseApiOutput {

    @Field(() => [OriginRepositoryModelObj], { defaultValue: [] })
    data: OriginRepositoryModelObj[];

}

@ObjectType()
export class OriginResponseObj extends basicResponseApiOutput {

    @Field(() => OriginRepositoryModelObj, { nullable: true })
    data: OriginRepositoryModelObj;

}