/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"
import { LocalizedLink as Link } from "gatsby-theme-i18n"

export default function ({ to, children }) {
  return (
    <LinkUI
      as={Link}
      sx={{ color: `textMuted`, display: `inline-block`, flexShrink: 0 }}
      to={to}
    >
      {children}
    </LinkUI>
  )
}
