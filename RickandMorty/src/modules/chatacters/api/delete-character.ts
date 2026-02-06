import { graphqlClient } from "../../../shared/presentation/graphql/client";
import { DELETE_CHARACTER } from "./graphql/delete-character.mutation";

interface DeleteCharacterResponse {
  deleteCharacter: {
    id: string;
  };
}

export const deleteCharacter = async (id: string | number): Promise<void> => {
  await graphqlClient.mutate<DeleteCharacterResponse>({
    mutation: DELETE_CHARACTER,
    variables: { id: String(id) },
  });
};
