/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"
import { LocalizedLink as Link } from "gatsby-theme-i18n"

export default function ({ datetime, slug }) {
  return (
    <LinkUI as={Link} sx={{ color: `textMuted` }} to={slug}>
      {datetime}
    </LinkUI>
  )
}
