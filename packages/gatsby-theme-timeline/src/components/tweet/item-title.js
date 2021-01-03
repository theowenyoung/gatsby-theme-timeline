/** @jsx jsx */
import { Box, jsx } from "theme-ui"
import processTweetString from "./process-tweet-string"

export default function ({ item }) {
  const { title, sharedContent } = item
  if (!title) {
    return null
  }
  const retweeted =
    sharedContent && sharedContent.title && title.startsWith(`RT @`)
  let finalTitle = title
  if (retweeted) {
    finalTitle = sharedContent.title
  }
  const body = processTweetString(finalTitle)
  return (
    <Box
      data-test="item-title"
      itemProp="name"
      sx={{ fontSize: 1, py: 2, whiteSpace: `pre-line` }}
    >
      {body}
    </Box>
  )
}
