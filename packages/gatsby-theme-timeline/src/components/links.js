/** @jsx jsx */
import { Box, jsx, Themed, Link as LinkUI } from "theme-ui"
import LinksTitle from "./links-title"
const Links = ({ links }) => {
  return (
    <Box data-test="links-container">
      <LinksTitle></LinksTitle>
      <Themed.ul>
        {links
          ? links.map((link, i) => {
              const attr = {}
              if (link.external) {
                attr.target = `_blank`
                attr.rel = `noopener noreferrer`
              }
              return (
                <li key={`links-${i}`}>
                  <LinkUI {...attr} href={link.url}>
                    {link.name}
                  </LinkUI>
                </li>
              )
            })
          : null}
      </Themed.ul>
    </Box>
  )
}

export default Links
