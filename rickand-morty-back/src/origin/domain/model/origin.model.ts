import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Origin {
    @Field()
    id: string;
    @Field()
    name: string;
}
