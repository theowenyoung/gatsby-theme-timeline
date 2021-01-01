/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"

export default function ({ to, children }) {
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
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </LinkUI>
  )
}
