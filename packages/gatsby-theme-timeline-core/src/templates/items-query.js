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
    allItem(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      nodes {
        id
        excerpt
        slug
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
