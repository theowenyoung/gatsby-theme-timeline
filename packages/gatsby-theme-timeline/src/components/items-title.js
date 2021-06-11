/** @jsx jsx */
import { Link as LinkUI, jsx, Themed } from "theme-ui"
import { withPrefix } from "gatsby"
import { LocalizedLink as Link } from "gatsby-theme-i18n"

/**
 * Shadow me to add your own bio content
 */

const ItemsTitle = ({ pageContext }) => {
  const { pageType, tag, basePath, currentPage } = pageContext
  if (pageType === `tag`) {
    return (
      <Themed.h4
        data-test="list-title"
        sx={{ fontWeight: `normal`, mb: `1.5rem` }}
      >
        <LinkUI sx={{ color: `text` }} as={Link} to={withPrefix(basePath)}>
          All posts
        </LinkUI>
        <span sx={{ color: `textMuted` }}> / </span>
        <span sx={{ color: `textMuted` }}>{tag}</span>
        {currentPage > 1 && <span sx={{ color: `textMuted` }}> / </span>}
        {currentPage > 1 && (
          <span sx={{ color: `textMuted` }}>page {currentPage}</span>
        )}
      </Themed.h4>
    )
  } else {
    return (
      <Themed.h4
        data-test="list-title"
        sx={{ fontWeight: `normal`, mb: `1.5rem` }}
      >
        Latest
        {currentPage > 1 && <span sx={{ color: `textMuted` }}> / </span>}
        {currentPage > 1 && (
          <span sx={{ color: `textMuted` }}>page {currentPage}</span>
        )}
      </Themed.h4>
    )
  }
}

export default ItemsTitle
