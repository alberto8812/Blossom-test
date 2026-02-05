import { Field, ObjectType } from "@nestjs/graphql";


import { basicResponseApiOutput } from "src/shared/graphql/reponse/reponse-api.output";
import { CharacterRepositoryModelObj } from "../output/character.type";

@ObjectType()
export class UpdateCharacters extends basicResponseApiOutput {

    @Field()
    id: string;

    @Field({ nullable: true })
    comment?: string;

}

