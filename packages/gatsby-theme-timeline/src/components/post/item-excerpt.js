/** @jsx jsx */
import { Styled, jsx } from "theme-ui"

export default function ({ item }) {
  const { excerpt } = item
  if (!excerpt) {
    return null
  }
  return <Styled.p sx={{ whiteSpace: `pre-line` }}>{excerpt}</Styled.p>
}
