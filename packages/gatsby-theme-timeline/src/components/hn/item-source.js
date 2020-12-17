/** @jsx jsx */
import { jsx } from "theme-ui"
import ItemSource from "../item-source"
export default function ({ item }) {
  return (
    <ItemSource to={`https://news.ycombinator.com/item?id=${item.hnId}`}>
      View on Hacker News
    </ItemSource>
  )
}
