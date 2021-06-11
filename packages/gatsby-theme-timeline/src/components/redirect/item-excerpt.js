/** @jsx jsx */
import { Themed, jsx } from "theme-ui"

export default function ({ item }) {
  const { excerpt } = item
  if (!excerpt) {
    return null
  }
  return (
    <Themed.p
      itemProp="description"
      data-test="item-excerpt"
      sx={{ whiteSpace: `pre-line`, mt: 0 }}
    >
      {excerpt}
    </Themed.p>
  )
}
