/** @jsx jsx */
import { jsx, Link as LinkUI, Flex } from "theme-ui"

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
      })}
    </Flex>
  )
}
export default Title
