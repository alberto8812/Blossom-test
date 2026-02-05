import { gql } from "@apollo/client";

export const UPDATE_CHARACTER = gql`
mutation UpdateCharacter($input: UpdateCharacterInput!) {
  updateCharacter(input: $input) {
    id
    comment
  }
}
`;