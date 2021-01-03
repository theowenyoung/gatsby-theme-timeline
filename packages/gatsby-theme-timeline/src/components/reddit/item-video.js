/** @jsx jsx */
import { jsx } from "theme-ui"
import Video from "./video"

const itemHero = ({ item }) => {
  const { video } = item

  if (!video || !video.url) {
    return null
  }
  const embed = video.embed
  const videoHeight = video.height
  const videoWidth = video.width
  let paddingBottom = `56.25%`
  if (videoHeight && videoWidth) {
    if (videoHeight > videoWidth) {
      paddingBottom = `100%`
    } else {
      paddingBottom = `${(videoHeight * 100) / videoWidth}%`
    }
  }

  return (
    <div sx={{ pb: 2 }}>
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
    </div>
  )
}

export default itemHero
