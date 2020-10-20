import { graphql } from "gatsby"
import ItemsPage from "../components/items-page"

export default ItemsPage

export const query = graphql`
  query TagPostsQuery(
    $tag: String!
    $skip: Int!
    $limit: Int!
    $maxWidth: Int!
  ) {
    site {
      siteMetadata {
        title
        social {
          name
          url
        }
      }
    }
    allBlogPost(
      sort: { fields: [date, slug], order: DESC }
      limit: $limit
      skip: $skip
      filter: { tags: { in: [$tag] } }
    ) {
      nodes {
        id
        excerpt
        slug
        title
        date(formatString: "MMMM DD, YYYY")
        tags
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
          authorName
          authorScreenName
          retweeted
          isQuoteStatus
          quoteBody
          quoteAuthorName
          quoteAuthorScreenName
          quoteAuthorAvatar {
            childImageSharp {
              fixed(width: 24, height: 24) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          quoteImage {
            childImageSharp {
              fluid(maxWidth: $maxWidth) {
                ...GatsbyImageSharpFluid
                src
              }
            }
          }
          authorAvatar {
            childImageSharp {
              fixed(width: 48, height: 48) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
