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

  @Field({ nullable: true })
  comment?: string;
}
