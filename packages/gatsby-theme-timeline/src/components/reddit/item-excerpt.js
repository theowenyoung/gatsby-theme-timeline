/** @jsx jsx */
import { Styled, jsx } from "theme-ui"

export default function ({ item }) {
  const { excerpt } = item
  if (!excerpt) {
    return null
  }
  return <Styled.p sx={{ whiteSpace: `pre-line`, mt: 0 }}>{excerpt}</Styled.p>
}
