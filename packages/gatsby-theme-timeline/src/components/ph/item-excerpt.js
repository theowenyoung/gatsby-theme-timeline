/** @jsx jsx */
import { Themed, jsx } from "theme-ui"

export default function ({ item }) {
  const { excerpt } = item
  if (!excerpt) {
    return null
  }
  return (
    <Themed.p
      data-test="item-excerpt"
      itemProp="description"
      sx={{ whiteSpace: `pre-line`, color: `textMuted` }}
    >
      {excerpt}
    </Themed.p>
  )
}
