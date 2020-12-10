/** @jsx jsx */
import { jsx, Link as LinkUI, Flex } from "theme-ui"
import { LocalizedLink as Link } from "gatsby-theme-i18n"

const Title = ({ menuLinks }) => {
  if (!menuLinks) {
    return null
  }
  return (
    <Flex sx={{ fontSize: `1.15rem`, fontWeight: `light` }}>
      {menuLinks.map((nav, index) => {
        const attr = {}
        if (nav.external) {
          attr.target = `_blank`
          attr.rel = `noopener noreferrer`
        }

        return (
          <LinkUI
            sx={{
              mr: 3,
              color: `text`,
              ":hover": {
                color: `primary`,
                textDecoration: `none`,
              },
            }}
            as={nav.url.startsWith(`http`) ? undefined : Link}
            to={nav.url}
            key={nav.url}
          >
            {nav.name}
          </LinkUI>
        )
      })}
    </Flex>
  )
}
export default Title
