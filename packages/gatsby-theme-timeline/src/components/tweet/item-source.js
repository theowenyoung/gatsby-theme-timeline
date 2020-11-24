/** @jsx jsx */
import { jsx } from "theme-ui"
import ItemSource from "../item-source"
export default function ({ item }) {
  return (
    <ItemSource
      to={`https://twitter.com/${item.authorScreenName}/status/${item.idStr}`}
    >
      View on Twitter
    </ItemSource>
  )
}
