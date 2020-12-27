import { graphql } from "gatsby"
import PostsPage from "../components/items-page"

export default PostsPage

export const query = graphql`
  query ItemsPostsQuery(
    $maxHeight: Int!
    $skip: Int!
    $limit: Int!
    $filter: BlogPostFilterInput
    $tagsFilter: BlogPostFilterInput
  ) {
    site {
      siteMetadata {
        title
        description
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
    tagsGroup: allBlogPost(
      sort: { fields: [date, title], order: DESC }
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
        dateISO: date
        datetime: date(formatString: "YYYY-MM-DD HH:mm")
        tags
        image {
          childImageSharp {
            fluid(maxHeight: $maxHeight) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageAlt
        ... on RedditPost {
          imageRemote
          video
          videoWidth
          videoHeight
          permalink
          isSelf
          postHint
          isVideo
          subreddit
          authorName
          url
          score
          redditId
        }
        ... on HnPost {
          imageRemote
          authorName
          score
          hnId
          url
        }
        ... on RedirectPost {
          authorName
          authorUrl
          imageRemote
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
        ... on YoutubePost {
          imageRemote
          authorName
          authorUrl
          views
          score
          url
          video
        }
        ... on TweetPost {
          idStr
          retweeted
          isQuoteStatus
          imageRemote
          quoteImageRemote
          authorAvatarRemote
          quoteAuthorAvatarRemote
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
              fluid(maxHeight: $maxHeight) {
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
