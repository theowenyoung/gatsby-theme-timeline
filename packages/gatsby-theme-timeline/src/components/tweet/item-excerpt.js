/** @jsx jsx */
import { Box, jsx } from "theme-ui"
import processTweetString from "./process-tweet-string"

export default function ({ item }) {
  const { excerpt } = item
  if (!excerpt) {
    return null
  }
  const body = processTweetString(excerpt)
  return (
    <Box
      data-test="item-excerpt"
      itemprop="description"
      sx={{ fontSize: 1, py: 2, whiteSpace: `pre-line` }}
    >
      {body}
    </Box>
  )
}
