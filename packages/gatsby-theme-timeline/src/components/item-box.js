/** @jsx jsx */
import Item from "gatsby-theme-timeline-core/src/components/item"
import { Styled, jsx } from "theme-ui"

const ItemBox = (props) => {
  return (
    <Styled.div
      as="article"
      sx={{
        paddingBottom: 4,
      }}
    >
      <Item {...props}></Item>
    </Styled.div>
  )
}
export default ItemBox
