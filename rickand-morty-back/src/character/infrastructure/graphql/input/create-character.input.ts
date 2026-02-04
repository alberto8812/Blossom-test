import { Field, InputType, ObjectType } from '@nestjs/graphql';
@InputType()
export class SaveCharacterRepositoryModeInput {
    @Field()
    name: string;

    @Field()
    status: string;

    @Field()
    img: string;

    @Field()
    species: string;

    @Field()
    originId: string;

    @Field()
    speciesId: string;
}

@InputType()
export class UpdateCharacterRepositoryModeInput extends SaveCharacterRepositoryModeInput {
    @Field()
    id: string;
}