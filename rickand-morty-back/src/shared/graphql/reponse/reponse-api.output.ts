import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class basicResponseApiOutput {
    @Field()
    message: string;

    @Field(() => Int)
    code: number;
}