/** @jsx jsx */
import Image from "gatsby-image"
import { jsx, Box } from "theme-ui"
const itemHero = ({ item }) => (
  <Box data-test="post-hero" sx={{ py: item?.image?.childImageSharp ? 2 : 0 }}>
    {item?.image?.childImageSharp && (
      <Image
        fluid={item.image.childImageSharp.fluid}
        alt={item.imageAlt ? item.imageAlt : item.excerpt}
      />
    )}
  </Box>
)

export default itemHero
