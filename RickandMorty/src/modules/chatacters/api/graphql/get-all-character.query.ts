import { gql } from "@apollo/client";

export const GET_ALL_CHARACTER = gql`
query Get_all_character($originId: String, $speciesId: String, $status: String, $name: String) {
  get_all_character(originId: $originId, speciesId: $speciesId, status: $status, name: $name) {
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

