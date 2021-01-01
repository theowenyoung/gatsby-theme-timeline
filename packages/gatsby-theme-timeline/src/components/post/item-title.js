/** @jsx jsx */
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { Link as LinkUI, jsx, Styled } from "theme-ui"
export default function ({ item }) {
  const { slug, title } = item
  return (
    <LinkUI data-test="item-title" sx={{ color: `text` }} as={Link} to={slug}>
      <Styled.h3 itemprop="name" sx={{ fontWeight: `normal` }}>
        {title}
      </Styled.h3>
    </LinkUI>
  )
}
