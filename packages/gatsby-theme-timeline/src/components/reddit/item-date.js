/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"
import { Link } from "gatsby"

export default function ({ datetime, slug }) {
  return (
    <LinkUI as={Link} sx={{ color: `textMuted` }} to={slug}>
      {datetime}
    </LinkUI>
  )
}
