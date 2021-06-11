/** @jsx jsx */
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { jsx, Box } from "theme-ui"
const itemHero = ({ item }) => (
  <Box
    data-test="item-hero-container"
    sx={{ py: item?.image?.childImageSharp ? 2 : 0 }}
  >
    {item?.image?.childImageSharp && (
      <GatsbyImage
        data-text="item-hero"
        itemProp="image"
        image={getImage(item.image)}
        alt={item.imageAlt ? item.imageAlt : item.excerpt}
      />
    )}
  </Box>
)

export default itemHero
