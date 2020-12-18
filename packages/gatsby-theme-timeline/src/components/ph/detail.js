/** @jsx jsx */

import { jsx, Styled, Link as LinkUI } from "theme-ui"
import { useState } from "react"
const Detail = ({ item }) => {
  const { phId, title, excerpt, phUrl, tagline, authorName, authorUrl } = item
  const [isShowPlaceholder, setIsShowPlaceholder] = useState(true)
  const handleOnLoad = () => {
    setIsShowPlaceholder(false)
  }
  return (
    <article>
      <div>
        {isShowPlaceholder && (
          <Styled.blockquote>
            <LinkUI
              href={phUrl}
              sx={{ fontSize: 2 }}
            >{`${title} - ${tagline}`}</LinkUI>
            <p>{excerpt}</p>
            &mdash;
            <LinkUI href={authorUrl}>{authorName}</LinkUI>
          </Styled.blockquote>
        )}
      </div>

      <div>
        <div sx={{ position: `relative`, pb: `81%` }}>
          <iframe
            title={title}
            src={`https://cards.producthunt.com/cards/posts/${phId}?v=1`}
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
