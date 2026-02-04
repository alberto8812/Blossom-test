import { ObjectType, Field, ID } from '@nestjs/graphql';

import { GenderRepositoryModelObj } from 'src/gender/infrastructare/graphql/output/genser.type';
import { OriginRepositoryModelObj } from 'src/origin/infrastructare/graphql/output/Origin.type';

@ObjectType()
export class CharacterRepositoryModelObj {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    status: string;

    @Field()
    species: string;

    @Field()
    img: string;

    @Field()
    originId: string;

    @Field()
    speciesId: string;

    @Field()
    origin: OriginRepositoryModelObj

    @Field()
    specie: GenderRepositoryModelObj
}