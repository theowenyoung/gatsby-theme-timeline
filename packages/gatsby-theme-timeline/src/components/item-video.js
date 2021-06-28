/** @jsx jsx */
import { jsx } from "theme-ui"
import ReactPlayer from "react-player"
import Video from "./video"
import { getSrc } from "gatsby-plugin-image"
import { useState, useEffect } from "react"
function getDomain(url) {
  url = url.replace(/(https?:\/\/)?(www.)?/i, ``)
  if (url.indexOf(`/`) !== -1) {
    return url.split(`/`)[0]
  }

  return url
}
function getImageUrl(item) {
  if (item.image && getSrc(item.image)) {
    return getSrc(item.image)
  }
  return item.imageRemote
}
const itemHero = ({ item }) => {
  const { video, provider } = item
  const [paddingBottom, setPaddingBottom] = useState(0)

  useEffect(() => {
    if (
      video &&
      video.url &&
      provider === `Reddit` &&
      video.height &&
      video.width
    ) {
      let screenWidth = window.innerWidth
      if (screenWidth > 1024) {
        screenWidth = 1024
      }
      let scale = 375 / screenWidth
      if (screenWidth >= 768) {
        scale = scale * 1.62
      } else {
        scale = scale * 1.1
      }
      const videoHeight = video.height + 248
      const videoWidth = video.width
      let thePaddingBottom = 56.25
      if (videoHeight && videoWidth) {
        if (videoHeight > videoWidth) {
          thePaddingBottom = 180
        } else {
          thePaddingBottom = (videoHeight * 100 * 1.6) / videoWidth
        }
      }
      setPaddingBottom(thePaddingBottom * scale + `%`)
    }
  }, null)
  if (!video || !video.url) {
    return null
  }
  // check video url
  const urlDomain = getDomain(video.url)
  const videoUrlObj = new URL(video.url)
  if (provider === `Reddit`) {
    const embed = video.embed
    const videoHeight = video.height + 248
    const videoWidth = video.width
    return (
      <figure sx={{ pb: 0, m: 0 }}>
        {embed ? (
          <div
            sx={{
              position: `relative`,
              height: 0,
              margin: 0,
              overflow: `hidden`,
              maxWidth: `full`,
              paddingBottom: paddingBottom,
            }}
          >
            <iframe
              data-test="item-embed-video"
              title={`video ${item.id}`}
              frameBorder="0"
              allowFullScreen
              scrolling="no"
              src={video.url}
              sx={{
                width: `full`,
                height: `full`,
                position: `absolute`,
                left: 0,
                top: 0,
              }}
            ></iframe>
          </div>
        ) : (
          video && (
            <Video
              embed={embed}
              src={video.url}
              height={videoHeight}
              width={videoWidth}
            ></Video>
          )
        )}
      </figure>
    )
  } else if (urlDomain === `youtube.com`) {
    const videoId = videoUrlObj.searchParams.get(`v`)

    return (
      <figure sx={{ position: `relative`, pb: `56.25%`, m: 0 }}>
        <iframe
          data-test="item-embed-video"
          title={item.title}
          type="text/html"
          sx={{ position: `absolute`, top: 0, left: 0 }}
          width="100%"
          height="100%"
          allowFullScreen
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
        ></iframe>
      </figure>
    )
  }
  // else youtube

  return (
    <figure data-test="item-video-container" sx={{ pb: 0, m: 0 }}>
      <div sx={{ position: `relative`, pb: `56.25%` }}>
        <ReactPlayer
          controls
          muted={true}
          sx={{ position: `absolute`, top: 0, left: 0 }}
          width="100%"
          height="100%"
          url={video.url}
          config={{
            file: {
              attributes: {
                muted: true,
                poster: getImageUrl(item),
              },
            },
          }}
        />
      </div>
    </figure>
  )
}

export default itemHero
