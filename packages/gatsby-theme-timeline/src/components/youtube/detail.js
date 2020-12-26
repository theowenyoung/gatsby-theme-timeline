/** @jsx jsx */
import { jsx } from "theme-ui"
import ReactPlayer from "react-player"

const Detail = ({ item }) => {
  const { video } = item

  if (!video) {
    return null
  }
  return (
    <div sx={{ pb: 0 }}>
      <div sx={{ position: `relative`, pb: `56.25%` }}>
        <ReactPlayer
          controls
          sx={{ position: `absolute`, top: 0, left: 0 }}
          width="100%"
          height="100%"
          url={video}
        />
      </div>
    </div>
  )
}

export default Detail
