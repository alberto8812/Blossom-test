import { gql } from "@apollo/client";

export const GET_ALL_CHARACTER = gql`
  query GetAllCharacters {
    get_all_character {
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
      }
    }
  }
`;

