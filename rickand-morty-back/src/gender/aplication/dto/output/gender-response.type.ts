import { Field, ObjectType } from "@nestjs/graphql";
import { basicResponseApiOutput } from "src/shared/graphql/reponse/reponse-api.output";
import { GenderRepositoryModelObj } from "./gender.type";

@ObjectType()
export class GendersResponseType extends basicResponseApiOutput {

    @Field(() => [GenderRepositoryModelObj], { defaultValue: [] })
    data: GenderRepositoryModelObj[];
}


@ObjectType()
export class GenderResponseObj extends basicResponseApiOutput {

    @Field(() => GenderRepositoryModelObj, { nullable: true })
    data: GenderRepositoryModelObj;

}