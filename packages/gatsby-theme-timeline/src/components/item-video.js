/** @jsx jsx */
import { jsx } from "theme-ui"
import ReactPlayer from "react-player"
import Video from "./video"
function getDomain(url) {
  url = url.replace(/(https?:\/\/)?(www.)?/i, ``)
  if (url.indexOf(`/`) !== -1) {
    return url.split(`/`)[0]
  }

  return url
}
const itemHero = ({ item }) => {
  const { video, provider } = item

  if (!video || !video.url) {
    return null
  }
  // check video url
  const urlDomain = getDomain(video.url)
  const videoUrlObj = new URL(video.url)

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
  } else if (urlDomain === `youtube.com`) {
    const videoId = videoUrlObj.searchParams.get(`v`)

    return (
      <div sx={{ position: `relative`, pb: `56.25%` }}>
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
      </div>
    )
  }
  // else youtube

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
