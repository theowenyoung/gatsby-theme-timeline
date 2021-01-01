/** @jsx jsx */
import { Link as LinkUI, jsx, Styled } from "theme-ui"

export default function ({ item }) {
  const { title, isSelf, permalink, url, postHint } = item
  return (
    <LinkUI
      sx={{ color: `text` }}
      data-test="item-title"
      href={
        isSelf || postHint === `image` || postHint === `hosted:video`
          ? `https://www.reddit.com${permalink}`
          : url
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <Styled.h3 itemprop="name" sx={{ fontSize: 2, fontWeight: `medium` }}>
        {title}
      </Styled.h3>
    </LinkUI>
  )
}
