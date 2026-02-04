import { graphqlClient } from "../../../shared/presentation/graphql/client";
import type { CharacterDB, ResponseCharacter } from "../domain/entity/character.interface.db";
import { characterMappers } from "../domain/mappers/characters/character.mappers";
import { GET_ALL_CHARACTER } from "./graphql/get-all-character.query";




export const getAllCharacters = async (): Promise<CharacterDB[]> => {
  try {
    const { data } = await graphqlClient.query<ResponseCharacter>(
      {
        query: GET_ALL_CHARACTER,
        fetchPolicy: "network-only",
        // variables: { ...filter },
        context: {
          headers: {
            authorization: `Bearer `,
          },
        },
      }
    );
    const { get_all_character } = data as ResponseCharacter;
    const transformedData = get_all_character.data.map(characterMappers)
    return transformedData as CharacterDB[];
  } catch (error: any) {
    throw new Error(`Error fetching characters: ${error.message}`);
  }
};
