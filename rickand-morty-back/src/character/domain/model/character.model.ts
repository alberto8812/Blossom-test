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

  @Field({ nullable: true })
  comment?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
