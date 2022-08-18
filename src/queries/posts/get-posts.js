
import { gql } from '@apollo/client'
import MenuFragment from '../fragments/menus'
import SeoFragment from "../fragments/seo";
import {HeaderFooter} from "../get-menus";
import ImageFragment from "../fragments/image";

/**
 * Get Posts
 *
 */
export const GET_POSTS = gql`
 query GET_POSTS( $uri: String, $perPage: Int, $offset: Int ) {
 ${HeaderFooter}
  page: pageBy(uri: $uri) {
    id
    title
    content
    slug
    uri
    seo {
      ...SeoFragment
    }
  }
  posts: posts(where: { offsetPagination: { size: $perPage, offset: $offset }}) {
    edges {
      node {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            ...ImageFragment
          }
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
 }
 ${MenuFragment}
 ${ImageFragment}
 ${SeoFragment}
 `;

export const GET_TOTAL_POSTS_COUNT = gql`
  query GET_TOTAL_POSTS_COUNT {
  postsCount: posts {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`

/**
 * Get post slugs.
 *
 */
export const GET_POST_SLUGS = gql`
 query GET_POST_SLUGS {
  posts: posts(last: 1) {
    nodes {
      id
      slug
    }
  }
 }
 `;


 export const GET_CATEGORY_SLUGS = gql`
  query GET_CATEGORY_SLUGS {
    categories {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
 `

 export const GET_CATEGORY_POSTS = gql`
 query GET_CATEGORY_POSTS($slug : String){
  ${HeaderFooter}

  categories(where: {slug: $slug}) {
    edges {
      node {
        slug
        name
        posts(where: {status: PUBLISH}) {
          edges {
            node {
              date
              title(format: RENDERED)
              uri
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM_LARGE)
                  altText
                }
              }
              categories {
                edges {
                  node {
                    name
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
 `
