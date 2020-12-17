/** @jsx jsx */
import { jsx } from "theme-ui"
import ItemDate from "../item-date"
export default function ({ item }) {
  return <ItemDate to={item.slug}>{item.date}</ItemDate>
}
