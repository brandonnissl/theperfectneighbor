import { gql } from "@apollo/client";

export const GET_RECENT = `
        posts(first: 3, where: {status: PUBLISH}) {
            edges {
              node {
                date
                title(format: RENDERED)
                uri
                featuredImage {
                  node {
                    sourceUrl(size: THUMBNAIL)
                    altText
                  }
                }
              }
            }
        }
`;


