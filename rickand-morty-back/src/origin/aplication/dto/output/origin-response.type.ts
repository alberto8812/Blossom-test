import { Field, ObjectType } from "@nestjs/graphql";
import { basicResponseApiOutput } from "src/shared/graphql/reponse/reponse-api.output";
import { OriginRepositoryModelObj } from "./Origin.type";

@ObjectType()
export class OriginsResponseType extends basicResponseApiOutput {

    @Field(() => [OriginRepositoryModelObj], { defaultValue: [] })
    data: OriginRepositoryModelObj[];
}


@ObjectType()
export class OriginResponseObj extends basicResponseApiOutput {

    @Field(() => OriginRepositoryModelObj, { nullable: true })
    data: OriginRepositoryModelObj;

}