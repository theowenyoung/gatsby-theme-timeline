/** @jsx jsx */
import { Link as LinkUI, jsx, Themed } from "theme-ui"

export default function ({ item }) {
  const { title, url } = item
  return (
    <LinkUI
      sx={{ color: `text` }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-test="item-title"
    >
      <Themed.h3
        itemProp="name"
        sx={{ fontWeight: `normal` }}
      >{`${title}`}</Themed.h3>
    </LinkUI>
  )
}
