/** @jsx jsx */
import { Styled, jsx } from "theme-ui"

export default function ({ item }) {
  const { excerpt } = item
  if (!excerpt) {
    return null
  }
  return (
    <Styled.p
      data-test="item-excerpt"
      itemprop="description"
      sx={{ whiteSpace: `pre-line`, mt: 0 }}
    >
      {excerpt}
    </Styled.p>
  )
}
