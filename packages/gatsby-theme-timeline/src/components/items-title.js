/** @jsx jsx */
import { Link as LinkUI, jsx, Styled } from "theme-ui"
import { withPrefix } from "gatsby"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
/**
 * Shadow me to add your own bio content
 */

const ItemsTitle = ({ pageType, tag, basePath }) => {
  if (pageType === `tag`) {
    return (
      <Styled.h3>
        <LinkUI sx={{ color: `textMuted` }} as={Link} to={withPrefix(basePath)}>
          All posts
        </LinkUI>
        <span> / </span>
        <span>{tag}</span>
      </Styled.h3>
    )
  } else {
    return <Styled.h4>Latest</Styled.h4>
  }
}

export default ItemsTitle
