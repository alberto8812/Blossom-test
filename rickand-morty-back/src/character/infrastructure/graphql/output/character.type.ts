import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GenderRepositoryModelObj } from 'src/gender/infrastructure/graphql/output/genser.type';
import { OriginRepositoryModelObj } from 'src/origin/infrastructure/graphql/output/Origin.type';


@ObjectType()
export class CharacterRepositoryModelObj {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    status: string;

    @Field()
    img: string;

    @Field()
    originId: string;

    @Field()
    speciesId: string;

    @Field()
    origin: OriginRepositoryModelObj

    @Field()
    species: GenderRepositoryModelObj

    @Field({ nullable: true })
    comment: string;
}