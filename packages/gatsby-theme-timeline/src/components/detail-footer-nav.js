/** @jsx jsx */
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { Flex, jsx, Link as LinkUI } from "theme-ui"

const DetailFooterNav = ({ previous, next, item, basePath }) => {
  if (!(previous || next)) {
    return null
  }
  return (
    <Flex
      as="ul"
      sx={{
        flexWrap: `wrap`,
        justifyContent: `space-between`,
        listStyle: `none`,
        padding: 0,
        pt: 3,
        pb: 4,
        fontSize: 2,
      }}
    >
      <li>
        {previous && (
          <LinkUI as={Link} to={previous.slug} rel="prev">
            ← {previous.title}
          </LinkUI>
        )}
      </li>
      <li>
        {next && (
          <LinkUI as={Link} to={next.slug} rel="next">
            {next.title} →
          </LinkUI>
        )}
      </li>
    </Flex>
  )
}

export default DetailFooterNav
