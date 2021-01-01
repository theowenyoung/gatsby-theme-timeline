/** @jsx jsx */
import Item from "./item"
import { Styled, jsx } from "theme-ui"

const ItemBox = (props) => {
  return (
    <Styled.div
      as="article"
      data-test="item-container"
      data-index={props.index}
      itemScope
      itemType="https://schema.org/Article https://schema.org/itemListElement"
      sx={{
        paddingBottom: 5,
      }}
    >
      <Item {...props}></Item>
    </Styled.div>
  )
}
export default ItemBox
