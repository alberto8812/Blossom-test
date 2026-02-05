import { graphqlClient } from "../../../shared/presentation/graphql/client";
import type { CharacterDB, ResponseCharacterId } from "../domain/entity/character.interface.db";
import { characterDetailMappers } from "../domain/mappers/characters/character.mappers";
import { GET_CHARACTER_BY_ID } from "./graphql/get-character-by-id.query";



export const getAllCharactersById = async (id: string): Promise<CharacterDB> => {

  const { data } = await graphqlClient.query<ResponseCharacterId>(
    {
      query: GET_CHARACTER_BY_ID,
      fetchPolicy: "network-only",
      variables: { getOneCharacterId: id },
    }
  );
  const { get_one_character } = data as ResponseCharacterId;
  const transformedData = characterDetailMappers(get_one_character.data);
  return transformedData;
};
