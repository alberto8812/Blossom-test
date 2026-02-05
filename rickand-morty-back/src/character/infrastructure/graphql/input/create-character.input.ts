import { Field, InputType, ObjectType } from '@nestjs/graphql';
@InputType()
export class SaveCharacterRepositoryModeInput {

    @Field({ nullable: true })
    comment?: string;
}

@InputType()
export class UpdateCharacterRepositoryModeInput extends SaveCharacterRepositoryModeInput {
    @Field()
    id: string;
}