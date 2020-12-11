/** @jsx jsx */
import { jsx, NavLink as LinkUI, Flex } from "theme-ui"
import { LocalizedLink as Link } from "gatsby-theme-i18n"

const Title = ({ menuLinks }) => {
  if (!menuLinks) {
    return null
  }
  return (
    <Flex as="nav">
      {menuLinks.map((nav, index) => {
        const attr = {}
        if (nav.external) {
          attr.target = `_blank`
          attr.rel = `noopener noreferrer`
        }

        return (
          <LinkUI
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
