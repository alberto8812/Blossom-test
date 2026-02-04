import { ObjectType, Field } from '@nestjs/graphql';
import { Origin } from '../../../origin/domain/model/origin.model';
import { Gender } from '../../../gender/domain/model/gender.model';

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
  img: string | null;

  @Field(() => String, { nullable: true })
  comment: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date | null;

  @Field(() => Origin, { nullable: true })
  origin?: Origin;

  @Field(() => Gender, { nullable: true })
  species?: Gender;
}
