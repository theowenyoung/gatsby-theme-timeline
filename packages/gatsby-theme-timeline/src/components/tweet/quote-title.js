/** @jsx jsx */
import { Box, jsx } from "theme-ui"
import processTweetString from "./process-tweet-string"

export default function ({ item }) {
  const { sharedContent } = item

  if (!sharedContent || !sharedContent.title) {
    return null
  }
  let finalQuoteBody = ``
  finalQuoteBody = processTweetString(sharedContent.title)

  return (
    <Box
      data-test="item-quote-excerpt"
      itemProp="citation"
      sx={{ fontSize: 1, py: 2, whiteSpace: `pre-line` }}
    >
      {finalQuoteBody}
    </Box>
  )
}
