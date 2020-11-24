/** @jsx jsx */
import Image from "gatsby-image"
import { jsx, Box } from "theme-ui"
const itemHero = ({ item }) => (
  <Box sx={{ pb: 2 }}>
    {item?.image?.childImageSharp && (
      <Image
        fluid={item.image.childImageSharp.fluid}
        alt={item.imageAlt ? item.imageAlt : item.excerpt}
      />
    )}
  </Box>
)

export default itemHero
