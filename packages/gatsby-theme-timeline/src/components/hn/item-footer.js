/** @jsx jsx */
import { jsx } from "theme-ui"
import ItemDate from "./item-date"
export default function ({ item }) {
  return (
    <footer sx={{ display: `flex` }}>
      <ItemDate item={item}></ItemDate>
    </footer>
  )
}
