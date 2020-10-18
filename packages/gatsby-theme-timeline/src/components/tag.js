/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"
import { Link } from "gatsby"

export default function ({ children, to }) {
  return (
    <LinkUI
      sx={{
        bg: `gray.1`,
        mr: 3,
        mb: 3,
        color: `textMuted`,
        px: 2,
        py: 1,
        ":hover": {
          bg: `gray.2`,
        },
      }}
      as={Link}
      to={to}
    >
      {children}
    </LinkUI>
  )
}
