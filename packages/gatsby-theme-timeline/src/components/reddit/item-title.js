/** @jsx jsx */
import { Link as LinkUI, jsx, Styled } from "theme-ui"

export default function ({ item }) {
  const { title, originalUrl } = item
  return (
    <LinkUI
      sx={{ color: `text` }}
      data-test="item-title"
      href={originalUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Styled.h3 itemProp="name" sx={{ fontSize: 2, fontWeight: `medium` }}>
        {title}
      </Styled.h3>
    </LinkUI>
  )
}
