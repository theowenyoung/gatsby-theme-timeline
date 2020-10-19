/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import { Link } from "gatsby"
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
