import { graphqlClient } from "../../../shared/presentation/graphql/client";
import { UPDATE_CHARACTER } from "./graphql/update-character.mutation";

interface UpdateCharacterInput {
  id: string;
  comment?: string;
}

interface UpdateCharacterResponse {
  updateCharacter: {
    id: string;
    comment: string;
  };
}

export const updateCharacterComment = async (input: UpdateCharacterInput): Promise<void> => {
  await graphqlClient.mutate<UpdateCharacterResponse>({
    mutation: UPDATE_CHARACTER,
    variables: { input },
  });
};
