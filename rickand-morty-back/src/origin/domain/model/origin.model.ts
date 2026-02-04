import { Field } from "@nestjs/graphql";

export class Origin {
    @Field()
    id: string;
    @Field()
    name: string;
}