import { graphql } from "gatsby"
import PostPage from "../../components/detail-page"

export default PostPage

export const query = graphql`
  query DetailPageQuery(
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
          external
          prefetch
        }
        menuLinks {
          name
          url
          external
          prefetch
        }
      }
    }
    blogPost(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      title
      tags
      date(formatString: "MMMM DD, YYYY")
      dateISO: date
      datetime: date(formatString: "YYYY-MM-DD HH:mm")
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
      ... on RedditPost {
        video
        videoWidth
        videoHeight
        imageRemote
        permalink
        isSelf
        postHint
        isVideo
        subreddit
        authorName
        url
        redditId
      }
      ... on HnPost {
        imageRemote
        authorName
        score
        hnId
        url
      }
      ... on PhPost {
        imageRemote
        authorName
        authorUrl
        phUrl
        score
        url
        tagline
        video
        phId
      }
      ... on TweetPost {
        idStr
        retweeted
        isQuoteStatus
        quoteBody
        quoteAuthorName
        quoteAuthorScreenName
        imageRemote
        quoteImageRemote
        authorAvatarRemote
        quoteAuthorAvatarRemote
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
        fields {
          basePath
        }
      }
      ... on MdxBlogPost {
        id
        fields {
          basePath
        }
      }
    }
    previous: blogPost(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    next: blogPost(id: { eq: $nextId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
