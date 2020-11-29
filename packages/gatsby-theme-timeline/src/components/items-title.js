/** @jsx jsx */
import { Link as LinkUI, jsx, Styled } from "theme-ui"
import { withPrefix } from "gatsby"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
/**
 * Shadow me to add your own bio content
 */

const ItemsTitle = ({ pageType, tag, basePath, currentPage }) => {
  if (pageType === `tag`) {
    return (
      <Styled.h4 sx={{ fontWeight: `normal`, mb: `1.5rem` }}>
        <LinkUI sx={{ color: `text` }} as={Link} to={withPrefix(basePath)}>
          All posts
        </LinkUI>
        <span sx={{ color: `textMuted` }}> / </span>
        <span sx={{ color: `textMuted` }}>{tag}</span>
        {currentPage > 1 && <span sx={{ color: `textMuted` }}> / </span>}
        {currentPage > 1 && (
          <span sx={{ color: `textMuted` }}>page {currentPage}</span>
        )}
      </Styled.h4>
    )
  } else {
    return (
      <Styled.h4 sx={{ fontWeight: `normal`, mb: `1.5rem` }}>
        Latest
        {currentPage > 1 && <span sx={{ color: `textMuted` }}> / </span>}
        {currentPage > 1 && (
          <span sx={{ color: `textMuted` }}>page {currentPage}</span>
        )}
      </Styled.h4>
    )
  }
}

export default ItemsTitle
