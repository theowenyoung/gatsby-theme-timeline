import { graphql } from "gatsby"
import ItemsPage from "../components/items-page"

export default ItemsPage

export const query = graphql`
  query ItemsQuery($skip: Int!, $limit: Int!, $maxWidth: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allItem(
      sort: { fields: [date, slug], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        excerpt
        slug
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        authorName
        authorId
        authorAvatar {
          childImageSharp {
            fixed(width: 48, height: 48) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: $maxWidth) {
              ...GatsbyImageSharpFluid
              src
            }
          }
        }
        imageAlt
        ... on TweetPost {
          idStr
        }
      }
    }
  }
`
