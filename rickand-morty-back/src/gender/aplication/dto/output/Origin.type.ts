import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class OriginRepositoryModelObj {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;
}