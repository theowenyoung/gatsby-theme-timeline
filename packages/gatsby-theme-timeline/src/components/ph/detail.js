/** @jsx jsx */

import { jsx, Themed, Link as LinkUI } from "theme-ui"
import { useState } from "react"
const Detail = ({ item }) => {
  const { thirdPartyId, title, excerpt, url, author, authorUrl } = item
  const [isShowPlaceholder, setIsShowPlaceholder] = useState(true)
  const handleOnLoad = () => {
    setIsShowPlaceholder(false)
  }
  return (
    <article>
      <div>
        {isShowPlaceholder && (
          <Themed.blockquote>
            <LinkUI href={url} sx={{ fontSize: 2 }}>
              {title}
            </LinkUI>
            <p>{excerpt}</p>
            &mdash;
            <LinkUI href={authorUrl}>{author}</LinkUI>
          </Themed.blockquote>
        )}
      </div>

      <div>
        <div sx={{ position: `relative`, pb: `81%` }}>
          <iframe
            title={title}
            src={`https://cards.producthunt.com/cards/posts/${thirdPartyId}?v=1`}
            width="100%"
            height="100%"
            sx={{ position: `absolute`, top: 0, left: 0 }}
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            onLoad={handleOnLoad}
          ></iframe>
        </div>
      </div>
    </article>
  )
}

export default Detail
