/** @jsx jsx */
import { jsx, Link as LinkUI } from "theme-ui"
export default function ({ item }) {
  return (
    <LinkUI
      target="_blank"
      rel="noopener noreferrer"
      sx={{ color: `textMuted`, display: `inline-block`, flexShrink: 0 }}
      href={item.url}
    >
      {item.datetime}
    </LinkUI>
  )
}
