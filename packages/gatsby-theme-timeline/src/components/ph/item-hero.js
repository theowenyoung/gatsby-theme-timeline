/** @jsx jsx */
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { jsx, Themed, Box, Link as LinkUI } from "theme-ui"
const itemHero = ({ item }) => {
  if (!(item?.image?.childImageSharp || item.imageRemote)) {
    return null
  }
  return (
    <Box
      sx={{
        py: item?.image?.childImageSharp || item.imageRemote ? 2 : 0,
        textAlign: `center`,
      }}
      data-test="item-hero-container"
    >
      <LinkUI href={item.imageRemote} data-test="item-hero">
        {item?.image?.childImageSharp ? (
          <GatsbyImage
            data-test="item-hero-image"
            image={getImage(item.image)}
            alt={item.imageAlt ? item.imageAlt : item.excerpt}
            sx={{ maxHeight: `lg` }}
            imgStyle={{ objectFit: `contain` }}
          />
        ) : (
          item.imageRemote && (
            <Themed.img
              data-test="item-hero-image"
              alt={item.imageAlt}
              sx={{ maxHeight: `lg` }}
              src={item.imageRemote}
            />
          )
        )}
      </LinkUI>
    </Box>
  )
}

export default itemHero
