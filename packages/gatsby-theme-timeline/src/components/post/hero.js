/** @jsx jsx */
import Image from "gatsby-image"
import { jsx, Box } from "theme-ui"
const PostHero = ({ post }) => (
  <Box sx={{ py: 2 }}>
    {post?.image?.childImageSharp && (
      <Image
        fluid={post.image.childImageSharp.fluid}
        alt={post.imageAlt ? post.imageAlt : post.excerpt}
      />
    )}
  </Box>
)

export default PostHero
