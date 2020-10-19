import { graphql } from "gatsby"
import PostsPage from "../components/items-page"

export default PostsPage

export const query = graphql`
  query ItemsPostsQuery($maxWidth: Int!, $skip: Int!, $limit: Int!) {
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
      limit: $limit
      skip: $skip
      sort: { fields: [date, title], order: DESC }
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
          authorId
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
