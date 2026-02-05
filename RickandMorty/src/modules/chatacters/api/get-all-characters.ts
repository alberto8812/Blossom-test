import { graphqlClient } from "../../../shared/presentation/graphql/client";
import type { CharacterDB, ResponseCharacter } from "../domain/entity/character.interface.db";
import { characterMappers } from "../domain/mappers/characters/character.mappers";
import { GET_ALL_CHARACTER } from "./graphql/get-all-character.query";


export type NameFilter = 'name' | 'speciesId' | 'status' | 'originId';
export interface CharacterFilter {
  name?: string;
  speciesId?: string;
  status?: string;
  originId?: string;
}

export const getAllCharacters = async (filter: CharacterFilter): Promise<CharacterDB[]> => {
  try {
    const { data } = await graphqlClient.query<ResponseCharacter>({
      query: GET_ALL_CHARACTER,
      fetchPolicy: "network-only",
    });
    const { get_all_character } = data as ResponseCharacter;
    const transformedData = get_all_character.data.map(characterMappers);
    return transformedData as CharacterDB[];
  } catch (error: any) {
    throw new Error(`Error fetching characters: ${error.message}`);
  }
};
