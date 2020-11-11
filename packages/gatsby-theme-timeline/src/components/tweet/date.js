/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
const Date = ({ slug, date }) => (
  <LinkUI as={Link} sx={{ color: `textMuted` }} to={slug}>
    {date}
  </LinkUI>
)

export default Date
