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
      ... on MdxBlogPost {
        id
        fields {
          basePath
        }
      }
      ... on SocialMediaPost {
        fields {
          basePath
        }
        thirdPartyId
        provider
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
              base64
              width
              height
              src
              srcSet
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
              fluid(maxWidth: $maxWidth) {
                ...GatsbyImageSharpFluid
                src
              }
            }
          }
          imageAlt
          authorImage {
            childImageSharp {
              fixed(width: 24, height: 24) {
                base64
                width
                height
                src
                srcSet
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
