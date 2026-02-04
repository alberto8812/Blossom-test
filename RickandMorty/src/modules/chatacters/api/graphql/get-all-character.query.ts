import { gql } from "@apollo/client";

export const GET_ALL_CHARACTER = gql`
query Get_all_character() {
  get_all_character() {
    data {
      id
      img
      name
  }
}
`;

