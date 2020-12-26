/** @jsx jsx */
import { jsx } from "theme-ui"
import ItemSource from "../item-source"
export default function ({ item }) {
  return <ItemSource to={item.url}>View on Youtube</ItemSource>
}
