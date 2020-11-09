/** @jsx jsx */
import Image from "gatsby-image"
import { jsx, Box } from "theme-ui"
const PostHero = ({ post }) => (
  <Box sx={{ py: post?.image?.childImageSharp ? 2 : 0 }}>
    {post?.image?.childImageSharp && (
      <Image
        fluid={post.image.childImageSharp.fluid}
        alt={post.imageAlt ? post.imageAlt : post.excerpt}
        sx={{ maxHeight: `lg` }}
        imgStyle={{ objectFit: `contain` }}
      />
    )}
  </Box>
)

export default PostHero
