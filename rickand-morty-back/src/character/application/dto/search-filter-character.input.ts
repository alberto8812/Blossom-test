import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchFilterCharacterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  originId?: string;

  @Field({ nullable: true })
  speciesId?: string;

  @Field({ nullable: true })
  comment?: string;
}
