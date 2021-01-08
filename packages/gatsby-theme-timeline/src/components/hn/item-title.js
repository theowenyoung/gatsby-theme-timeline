/** @jsx jsx */
import { Link as LinkUI, jsx, Styled } from "theme-ui"
function getDomain(url) {
  url = url.replace(/(https?:\/\/)?(www.)?/i, ``)
  if (url.indexOf(`/`) !== -1) {
    return url.split(`/`)[0]
  }

  return url
}
export default function ({ item }) {
  const { title, url, originalUrl } = item
  const finalUrl = originalUrl || url
  return (
    <LinkUI data-test="item-title" sx={{ color: `text` }} href={finalUrl}>
      <Styled.h3
        itemProp="name"
        sx={{ fontWeight: `normal`, fontSize: `1.5rem` }}
      >
        {title}
        {` `}
        {finalUrl && (
          <span sx={{ color: `textMuted`, fontSize: `0.9rem` }}>
            ({getDomain(finalUrl)})
          </span>
        )}
      </Styled.h3>
    </LinkUI>
  )
}
