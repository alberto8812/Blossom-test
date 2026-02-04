import { Field, ObjectType } from "@nestjs/graphql";

import { CharacterRepositoryModelObj } from "./character.type";
import { object } from "joi";
import { basicResponseApiOutput } from "src/shared/graphql/reponse/reponse-api.output";

@ObjectType()
export class CharactersResponseObj extends basicResponseApiOutput {

    @Field(() => [CharacterRepositoryModelObj], { defaultValue: [] })
    data: CharacterRepositoryModelObj[];

}

@ObjectType()
export class CharacterResponseObj extends basicResponseApiOutput {

    @Field(() => CharacterRepositoryModelObj, { nullable: true })
    data: CharacterRepositoryModelObj;

}