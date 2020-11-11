/** @jsx jsx */
import { jsx, Link as LinkUI } from "theme-ui"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
export default function ({ to, children }) {
  return (
    <LinkUI
      as={Link}
      to={to}
      sx={{
        color: `textMuted`,
        fontStyle: `italic`,
        "::before": {
          content: `"#"`,
        },
        mr: 2,
      }}
    >
      <span>{children}</span>
    </LinkUI>
  )
}
