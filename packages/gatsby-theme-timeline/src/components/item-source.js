/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"

export default function ({ item }) {
  return (
    <LinkUI
      data-test="item-source"
      sx={{
        overflow: `hidden`,
        whiteSpace: `nowrap`,
        textOverflow: `ellipsis`,
        display: `inline-block`,
        flexShrink: 1,
      }}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      View on {item.provider}
    </LinkUI>
  )
}
