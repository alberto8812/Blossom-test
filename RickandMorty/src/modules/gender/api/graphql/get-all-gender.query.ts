import { gql } from "@apollo/client";

export const GET_ALL_GENDER = gql`
query Get_all_gender {
  get_all_gender {
    code
    message
    data {
      name
      id
    }
  }
}
`;
