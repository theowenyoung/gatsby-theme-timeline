/** @jsx jsx */

import { jsx, Themed, Link as LinkUI } from "theme-ui"
import { useState } from "react"
const Detail = ({ item }) => {
  const { title, url, channel, channelUrl } = item
  const urlObj = new URL(url)
  const pathname = urlObj.pathname
  const [isShowPlaceholder, setIsShowPlaceholder] = useState(true)
  const handleOnLoad = () => {
    setIsShowPlaceholder(false)
  }
  return (
    <article>
      <div>
        {isShowPlaceholder && (
          <Themed.blockquote>
            <LinkUI href={url}>{title}</LinkUI>
            <br />
            from
            <LinkUI href={channelUrl}>{` /r/${channel}`}</LinkUI>
          </Themed.blockquote>
        )}
      </div>

      <div>
        <div sx={{ position: `relative`, pb: `56.25%` }}>
          <iframe
            id="reddit-embed"
            title={title}
            src={`https://www.redditmedia.com${pathname}?ref_source=embed&amp;ref=share&amp;embed=true`}
            width="100%"
            height="100%"
            sx={{ position: `absolute`, top: 0, left: 0 }}
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-popups"
            onLoad={handleOnLoad}
          ></iframe>
        </div>
      </div>
    </article>
  )
}

export default Detail
