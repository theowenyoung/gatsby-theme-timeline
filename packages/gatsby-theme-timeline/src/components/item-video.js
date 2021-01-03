/** @jsx jsx */
import { jsx } from "theme-ui"
import ReactPlayer from "react-player"
import Video from "./video"
const itemHero = ({ item }) => {
  const { video, provider } = item

  if (!video || !video.url) {
    return null
  }
  if (provider === `Reddit`) {
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
      <div sx={{ pb: 0 }}>
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
  return (
    <div data-test="item-video-container" sx={{ pb: 0 }}>
      <div sx={{ position: `relative`, pb: `56.25%` }}>
        <ReactPlayer
          controls
          sx={{ position: `absolute`, top: 0, left: 0 }}
          width="100%"
          height="100%"
          url={video.url}
        />
      </div>
    </div>
  )
}

export default itemHero
