/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
export default function ({ to, children }) {
  return (
    <Styled.a
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
    </Styled.a>
  )
}
