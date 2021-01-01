/** @jsx jsx */
import { Styled, jsx } from "theme-ui"

export default function ({ item }) {
  const { excerpt } = item
  if (!excerpt) {
    return null
  }
  return (
    <Styled.p
      itemprop="description"
      data-test="item-excerpt"
      sx={{ whiteSpace: `pre-line`, mt: 0 }}
    >
      {excerpt}
    </Styled.p>
  )
}
