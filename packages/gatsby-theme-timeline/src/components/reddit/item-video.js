/** @jsx jsx */
import { jsx } from "theme-ui"
import Video from "./video"

const itemHero = ({ item }) => {
  const { isVideo, video, redditId, videoHeight, videoWidth } = item

  if (!(isVideo || video)) {
    return null
  }
  return (
    <div sx={{ pb: 2 }}>
      {isVideo ? (
        <div
          sx={{
            position: `relative`,
            height: 0,
            overflow: `hidden`,
            width: `full`,
            paddingBottom: `56.25%`,
          }}
        >
          <iframe
            title={`video ${redditId}`}
            frameBorder="0"
            allowFullScreen
            scrolling="no"
            src={`https://old.reddit.com/mediaembed/${redditId}`}
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
