import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCharacterInput {
  @Field()
  name: string;

  @Field()
  status: string;

  @Field()
  originId: string;

  @Field()
  speciesId: string;

  @Field(() => String, { nullable: true, defaultValue: null })
  img: string | null;

  @Field(() => String, { nullable: true, defaultValue: null })
  comment: string | null;
}
