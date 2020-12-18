/** @jsx jsx */
import { jsx } from "theme-ui"
import ItemSource from "../item-source"
export default function ({ item }) {
  return <ItemSource to={item.phUrl}>View on Product Hunt</ItemSource>
}
