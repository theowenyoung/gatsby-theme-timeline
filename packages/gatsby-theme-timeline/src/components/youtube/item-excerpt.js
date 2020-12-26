/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import processReactString from "./process-string"
export default function ({ item }) {
  const { excerpt } = item
  if (!excerpt) {
    return null
  }
  const finalExcerpt = processReactString(excerpt)
  return (
    <Styled.p sx={{ whiteSpace: `pre-line`, color: `textMuted` }}>
      {finalExcerpt}
    </Styled.p>
  )
}
