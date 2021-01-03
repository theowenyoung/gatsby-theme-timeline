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
        ... on SocialMediaPost {
          provider
          thirdPartyId
          url
          originalUrl
          imageRemote
          video {
            url
            embed
            width
            height
          }
          channel
          channelUrl
          author
          authorUrl
          authorImage {
            childImageSharp {
              fixed(width: 48, height: 48) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          authorSlug
          score
          views
          sharedCount
          likeCount
          sharedContent {
            excerpt
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            dateISO: date
            datetime: date(formatString: "YYYY-MM-DD HH:mm")
            tags
            imageRemote
            image {
              childImageSharp {
                fluid(maxHeight: $maxHeight) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageAlt
            authorImage {
              childImageSharp {
                fixed(width: 24, height: 24) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            video {
              url
              embed
              width
              height
            }
            channel
            channelUrl
            author
            authorUrl
            authorSlug
            score
            views
            sharedCount
            likeCount
          }
        }
      }
    }
  }
`
