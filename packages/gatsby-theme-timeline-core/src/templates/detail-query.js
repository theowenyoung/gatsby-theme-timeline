import { graphql } from "gatsby"
import DetailPage from "../components/detail-page"

export default DetailPage

export const query = graphql`
  query ItemPageQuery(
    $id: String!
    $previousId: String
    $nextId: String
    $maxWidth: Int
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
    item(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      title
      tags
      date(formatString: "MMMM DD, YYYY")
      image {
        childImageSharp {
          fluid(maxWidth: $maxWidth) {
            ...GatsbyImageSharpFluid
            src
          }
        }
      }
      imageAlt
      socialImage {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
            src
          }
        }
      }
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
    previous: item(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    next: item(id: { eq: $nextId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
