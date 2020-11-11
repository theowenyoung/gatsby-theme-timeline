/** @jsx jsx */
import { Box, jsx, Styled, Link as LinkUI } from "theme-ui"
import LinksTitle from "./links-title"
const Links = ({ links }) => {
  return (
    <Box>
      <LinksTitle></LinksTitle>
      <Styled.ul>
        {links
          ? links.map((link, i, arr) => (
              <li key={`links-${i}`}>
                <LinkUI
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </LinkUI>
              </li>
            ))
          : null}
      </Styled.ul>
    </Box>
  )
}

export default Links
