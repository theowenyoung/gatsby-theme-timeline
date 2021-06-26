import { graphql } from "gatsby"
import PostPage from "../../components/detail-page"

export default PostPage

export const query = graphql`
  query DetailPageQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
        author
        description
        keywords
        siteUrl
        telegram
        iconUrl
        defaultSocialImageUrl
        social {
          name
          url
          external
        }
        menuLinks {
          name
          url
          external
        }
        disqus {
          shortname
        }
        utterances {
          repo
          label
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
          gatsbyImageData
        }
      }
      imageAlt
      socialImage {
        childImageSharp {
          gatsbyImageData
        }
      }
      __typename
      ... on SocialMediaPost {
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
        authorImageRemote
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
          authorImageRemote
          authorImage {
            childImageSharp {
              gatsbyImageData(width: 24, height: 24, layout: FIXED)
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
