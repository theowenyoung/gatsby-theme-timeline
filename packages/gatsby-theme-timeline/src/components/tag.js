/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"
import { LocalizedLink as Link } from "gatsby-theme-i18n"

export default function ({ children, to, count }) {
  return (
    <LinkUI
      sx={{
        bg: `gray.1`,
        mr: 3,
        mb: 2,
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
      {count && `(${count})`}
    </LinkUI>
  )
}
