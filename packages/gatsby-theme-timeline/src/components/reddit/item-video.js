/** @jsx jsx */
import { jsx } from "theme-ui"
import Video from "./video"

const itemHero = ({ item }) => {
  const { isVideo, video, redditId, videoHeight, videoWidth } = item

  if (!(isVideo || video)) {
    return null
  }
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
      {isVideo ? (
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
            title={`video ${redditId}`}
            frameBorder="0"
            allowFullScreen
            scrolling="no"
            src={`https://www.reddit.com/mediaembed/${redditId}`}
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
            isVideo={isVideo}
            src={video}
            height={videoHeight}
            width={videoWidth}
          ></Video>
        )
      )}
    </div>
  )
}

export default itemHero
