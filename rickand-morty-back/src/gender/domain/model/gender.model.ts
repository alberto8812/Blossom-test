import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Gender {

    @Field()
    id: string;
    @Field()
    name: string;

}