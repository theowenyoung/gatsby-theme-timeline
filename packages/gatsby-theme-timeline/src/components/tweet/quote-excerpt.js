/** @jsx jsx */
import { Box, jsx } from "theme-ui"
import processTweetString from "./process-tweet-string"

export default function ({ item }) {
  const { isQuoteStatus, quoteBody } = item

  if (!isQuoteStatus || !quoteBody) {
    return null
  }
  let finalQuoteBody = ``
  if (isQuoteStatus) {
    finalQuoteBody = processTweetString(quoteBody)
  }
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
