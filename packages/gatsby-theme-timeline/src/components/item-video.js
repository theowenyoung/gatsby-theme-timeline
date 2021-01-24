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
function getImageUrl(item) {
  if (item.image && item?.image?.childImageSharp?.fluid?.src) {
    return item.image.childImageSharp.fluid.src
  }
  return item.imageRemote
}
const itemHero = ({ item }) => {
  const { video, provider } = item

  if (!video || !video.url) {
    return null
  }
  // check video url
  const urlDomain = getDomain(video.url)
  const videoUrlObj = new URL(video.url)
  console.log(`urlDomain`, urlDomain)

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
