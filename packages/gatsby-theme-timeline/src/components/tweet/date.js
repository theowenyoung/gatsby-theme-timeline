/** @jsx jsx */
import { Link as LinkUI, jsx } from "theme-ui"
import { Link } from "gatsby"
const Date = ({ slug, date }) => (
  <LinkUI as={Link} sx={{ color: `textMuted` }} to={slug}>
    {date}
  </LinkUI>
)

export default Date
