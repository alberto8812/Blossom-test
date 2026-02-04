import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCharacterInput } from './create-character.input';

@InputType()
export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {
  @Field()
  id: string;
}
