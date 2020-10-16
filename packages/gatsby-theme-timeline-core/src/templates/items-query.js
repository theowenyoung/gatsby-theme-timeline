import { graphql } from "gatsby"
import ItemsPage from "../components/items-page"

export default ItemsPage

export const query = graphql`
  query ItemsQuery {
    site {
      siteMetadata {
        title
        social {
          name
          url
        }
      }
    }
    allItem(sort: { fields: [date, slug], order: DESC }, limit: 1000) {
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
        ... on TweetPost {
          idStr
        }
      }
    }
  }
`
