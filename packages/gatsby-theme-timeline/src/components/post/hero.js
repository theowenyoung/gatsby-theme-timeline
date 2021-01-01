/** @jsx jsx */
import Image from "gatsby-image"
import { jsx, Box } from "theme-ui"
const itemHero = ({ item }) => (
  <Box data-test="item-hero" sx={{ py: item?.image?.childImageSharp ? 2 : 0 }}>
    {item?.image?.childImageSharp && (
      <Image
        data-text="item-hero"
        itemProp="image"
        fluid={item.image.childImageSharp.fluid}
        alt={item.imageAlt ? item.imageAlt : item.excerpt}
      />
    )}
  </Box>
)

export default itemHero
