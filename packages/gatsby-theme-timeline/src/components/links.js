/** @jsx jsx */
import { Box, jsx, Styled } from "theme-ui"
const Links = ({ links }) => {
  return (
    <Box>
      <Styled.h4 sx={{ color: `text` }}>Links</Styled.h4>
      <Styled.ul>
        {links
          ? links.map((link, i, arr) => (
              <li key={`links-${i}`}>
                <Styled.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </Styled.a>
              </li>
            ))
          : null}
      </Styled.ul>
    </Box>
  )
}

export default Links
