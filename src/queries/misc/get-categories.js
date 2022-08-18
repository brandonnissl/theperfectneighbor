import { gql } from "@apollo/client";

export const GET_CAT = gql`
	query GET_CAT {
        categories {
            edges {
              node {
                name
                count
                uri
              }
            }
          }
	}
`;


