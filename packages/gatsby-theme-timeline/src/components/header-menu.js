/** @jsx jsx */
import { jsx, Link as LinkUI, Flex } from "theme-ui"
import { LocalizedLink as Link } from "gatsby-theme-i18n"

const Title = ({ menuLinks }) => {
  if (!menuLinks) {
    return null
  }
  return (
    <Flex sx={{ fontSize: 2 }}>
      {menuLinks.map((nav, index) => {
        const attr = {}
        if (nav.external) {
          attr.target = `_blank`
          attr.rel = `noopener noreferrer`
        }
        if (nav.url.startsWith(`http`)) {
          return (
            <LinkUI
              sx={{ mr: index < menuLinks.length - 1 ? 3 : 0 }}
              href={nav.url}
              key={nav.url}
              {...attr}
            >
              {nav.name}
            </LinkUI>
          )
        } else {
          return (
            <LinkUI
              as={Link}
              sx={{ mr: index < menuLinks.length - 1 ? 3 : 0 }}
              to={nav.url}
              key={nav.url}
            >
              {nav.name}
            </LinkUI>
          )
        }
      })}
    </Flex>
  )
}
export default Title
