import { graphql } from "gatsby"
import PostsPage from "../components/items-page"

export default PostsPage

export const query = graphql`
  query ItemsPostsQuery(
    $maxWidth: Int!
    $skip: Int!
    $limit: Int!
    $filter: BlogPostFilterInput
    $tagsFilter: BlogPostFilterInput
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
    tagsGroup: allBlogPost(
      sort: { fields: [date, slug], order: DESC }
      filter: $tagsFilter
    ) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
    allBlogPost(
      limit: $limit
      skip: $skip
      sort: { fields: [date, title], order: DESC }
      filter: $filter
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
          authorName
          authorScreenName
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
