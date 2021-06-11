/** @jsx jsx */
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { Link as LinkUI, jsx, Themed } from "theme-ui"
export default function ({ item }) {
  const { slug, title } = item
  return (
    <LinkUI data-test="item-title" sx={{ color: `text` }} as={Link} to={slug}>
      <Themed.h3 itemProp="name" sx={{ fontWeight: `normal` }}>
        {title}
      </Themed.h3>
    </LinkUI>
  )
}
