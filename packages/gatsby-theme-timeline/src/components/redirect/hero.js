/** @jsx jsx */
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { jsx, Themed, Box, Link as LinkUI } from "theme-ui"
const itemHero = ({ item }) => {
  if (!(item?.image?.childImageSharp || item.imageRemote)) {
    return null
  }
  return (
    <Box
      data-test="item-hero-container"
      sx={{
        py: item?.image?.childImageSharp || item.imageRemote ? 2 : 0,
        textAlign: `center`,
      }}
    >
      <LinkUI href={item.imageRemote}>
        {item?.image?.childImageSharp ? (
          <GatsbyImage
            data-test="item-hero"
            image={getImage(item.image)}
            alt={item.imageAlt ? item.imageAlt : item.excerpt}
            sx={{ maxHeight: `lg` }}
            imgStyle={{ objectFit: `contain` }}
          />
        ) : (
          item.imageRemote && (
            <Themed.img
              data-test="item-hero"
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
