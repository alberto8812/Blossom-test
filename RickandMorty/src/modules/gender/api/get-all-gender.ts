import { graphqlClient } from "../../../shared/presentation/graphql/client";
import type { GenderResponse, SpecieDB } from "../domain/entity/specie.interface";
import { genderMappers } from "../domain/mapper/gender.mapper";
import { GET_ALL_GENDER } from "./graphql/get-all-gender.query";


export const getAllGender = async (): Promise<SpecieDB[]> => {

  const { data } = await graphqlClient.query<GenderResponse>(
    {
      query: GET_ALL_GENDER,
      fetchPolicy: "network-only",
      context: {
        headers: {
          authorization: `Bearer `,
        },
      },
    }
  );
  const { get_all_gender } = data as GenderResponse;
  const transformedData = get_all_gender.data.map(genderMappers)
  return transformedData;
};
