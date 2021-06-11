import { graphql } from "gatsby"
import PostsPage from "../components/items-page"

export default PostsPage

export const query = graphql`
  query ItemsPostsQuery(
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
            gatsbyImageData
          }
        }
        imageAlt
        __typename
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
              gatsbyImageData(width: 48, height: 48, layout: FIXED)
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
                gatsbyImageData
              }
            }
            imageAlt
            authorImage {
              childImageSharp {
                gatsbyImageData(width: 48, height: 48, layout: FIXED)
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
