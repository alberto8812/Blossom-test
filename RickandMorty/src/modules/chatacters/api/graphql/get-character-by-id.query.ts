import { gql } from "@apollo/client";

export const GET_CHARACTER_BY_ID = gql`
query Get_one_character($getOneCharacterId: String!) {
  get_one_character(id: $getOneCharacterId) {
    code
    message
    data {
      id
      name
      status
      img
      origin {
        name
      }
      species {
        name
      }
       comment
    }
  }
}
`;
