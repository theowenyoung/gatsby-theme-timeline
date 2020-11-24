/** @jsx jsx */
import Image from "gatsby-image"
import { jsx, Box } from "theme-ui"
const itemHero = ({ item }) => (
  <Box sx={{ py: item?.image?.childImageSharp ? 2 : 0 }}>
    {item?.image?.childImageSharp && (
      <Image
        fluid={item.image.childImageSharp.fluid}
        alt={item.imageAlt ? item.imageAlt : item.excerpt}
        sx={{ maxHeight: `lg` }}
        imgStyle={{ objectFit: `contain` }}
      />
    )}
  </Box>
)

export default itemHero
