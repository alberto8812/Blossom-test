import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class GenderRepositoryModelObj {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;
}