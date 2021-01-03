/** @jsx jsx */
import { jsx } from "theme-ui"
import ItemDate from "./item-date"
import ItemSource from "../item-source"
export default function ({ item }) {
  return (
    <footer sx={{ display: `flex` }}>
      <ItemDate item={item}></ItemDate>
      <span
        sx={{
          color: `textMuted`,
          display: `inline-block`,
          mx: 1,
          flexShrink: 0,
        }}
      >
        ·
      </span>
      <ItemSource item={item}></ItemSource>
    </footer>
  )
}
