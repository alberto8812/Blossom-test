import { gql } from "@apollo/client";

export const GET_ALL_ORIGIN = gql`
query Get_all_origins {
  get_all_origins {
    code
    data {
      name
      id
    }
    message
  }
}
`;
