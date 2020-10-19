/** @jsx jsx */
import { Link as LinkUI, jsx, Styled } from "theme-ui"
import { Link, withPrefix } from "gatsby"
/**
 * Shadow me to add your own bio content
 */

const ItemsTitle = ({ type, tag }) => {
  if (type === `Tag`) {
    return (
      <Styled.h3>
        <LinkUI sx={{ color: `textMuted` }} as={Link} to={withPrefix(`/`)}>
          All posts
        </LinkUI>
        <span> / </span>
        <span>{tag}</span>
      </Styled.h3>
    )
  } else {
    return <Styled.h4>{type}</Styled.h4>
  }
}

export default ItemsTitle
