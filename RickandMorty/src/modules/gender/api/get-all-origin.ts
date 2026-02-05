import { graphqlClient } from "../../../shared/presentation/graphql/client";
import type { OriginDB, ResponseOrigin } from "../domain/entity/origin.interface";
import { originMappers } from "../domain/mappers/origin.mappers";
import { GET_ALL_ORIGIN } from "./graphql/get-all-origin.query";


export const getAllOrigin = async (): Promise<OriginDB[]> => {

  const { data } = await graphqlClient.query<ResponseOrigin>(
    {
      query: GET_ALL_ORIGIN,
      fetchPolicy: "network-only",
    }
  );
  const { get_all_origins } = data as ResponseOrigin;
  const transformedData = get_all_origins.data.map(originMappers)
  return transformedData;
};
