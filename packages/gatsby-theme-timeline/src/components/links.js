/** @jsx jsx */
import { useStaticQuery, graphql } from "gatsby"
import { Box, jsx, Styled } from "theme-ui"
const Links = () => {
  const data = useStaticQuery(linksQuery)
  const {
    site: {
      siteMetadata: { links },
    },
  } = data

  return (
    <Box>
      <Styled.h5 sx={{ pb: 1, color: `text` }}>Links</Styled.h5>
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

const linksQuery = graphql`
  query LinksQuery {
    site {
      siteMetadata {
        links {
          name
          url
        }
      }
    }
  }
`

export default Links
