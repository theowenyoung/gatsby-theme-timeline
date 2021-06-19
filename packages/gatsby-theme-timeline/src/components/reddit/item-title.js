/** @jsx jsx */
import { Link as LinkUI, jsx, Themed } from "theme-ui"

export default function ({ item }) {
  const { title, originalUrl, video } = item
  if (video && video.embed) {
    return null
  }
  return (
    <LinkUI
      sx={{ color: `text` }}
      data-test="item-title"
      href={originalUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Themed.h3 itemProp="name" sx={{ fontSize: 2, fontWeight: `medium` }}>
        {title}
      </Themed.h3>
    </LinkUI>
  )
}
