import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menus";
import { HeaderFooter } from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_PAGE = gql`
	query GET_PAGE($uri: String) {
      ${HeaderFooter}
	  posts (first: 3, where: {status: PUBLISH}) {
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
	categories {
		edges {
		  node {
			name
			count
			uri
		  }
		}
	  }
	  page: pageBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
		date
		author {
			node {
			  avatar {
				url
			  }
			  firstName
			  lastName
			  slug
			}
		  }
		blocks {
			saveContent
		}
		featuredImage {
			node {
			  sourceUrl
			  altText
			}
		  }
	    seo {
          ...SeoFragment
        }
		
	  }
	}
	${MenuFragment}
	${SeoFragment}
`;

export const GET_PAGE_BY_ID = gql`
	query GET_PAGE_BY_ID($id: ID!) {
		${HeaderFooter}
	  page(idType: DATABASE_ID, id: $id) {
	    id
	    title
	    content
	    slug
	    uri
	    seo {
          ...SeoFragment
        }
		status
	  }
	}
	${MenuFragment}
	${SeoFragment}
`;
