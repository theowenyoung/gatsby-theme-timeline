/** @jsx jsx */
import { Link as LinkUI, jsx, Styled } from "theme-ui"

export default function ({ item }) {
  const { title, url, tagline } = item
  return (
    <LinkUI
      sx={{ color: `text` }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Styled.h3
        sx={{ fontWeight: `normal` }}
      >{`${title} - ${tagline}`}</Styled.h3>
    </LinkUI>
  )
}
