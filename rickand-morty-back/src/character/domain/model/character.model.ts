import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Character {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  status: string;

  @Field()
  originId: string;

  @Field()
  speciesId: string;

  @Field(() => String, { nullable: true })
  comment: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date | null;
}
