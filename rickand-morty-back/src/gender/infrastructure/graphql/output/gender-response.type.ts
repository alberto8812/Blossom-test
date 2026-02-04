import { Field, ObjectType } from "@nestjs/graphql";
import { GenderRepositoryModelObj } from "./genser.type";
import { basicResponseApiOutput } from "src/shared/graphql/reponse/reponse-api.output";


@ObjectType()
export class GendersResponseObj extends basicResponseApiOutput {

    @Field(() => [GenderRepositoryModelObj], { defaultValue: [] })
    data: GenderRepositoryModelObj[];

}

@ObjectType()
export class GenderResponseObj extends basicResponseApiOutput {

    @Field(() => GenderRepositoryModelObj, { nullable: true })
    data: GenderRepositoryModelObj;

}