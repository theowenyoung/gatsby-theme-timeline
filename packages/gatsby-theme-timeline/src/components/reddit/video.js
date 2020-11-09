/** @jsx jsx */
import { jsx, Box } from "theme-ui"

export default function Video({ src, width, height, isVideo }) {
  if (isVideo) {
    return (
      <Box>
        <video
          preload="auto"
          controls
          autoPlay={true}
          muted={true}
          sx={{ maxHeight: `lg`, width: `full` }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </Box>
    )
  }
  return (
    <Box sx={{ display: `flex`, justifyContent: `center` }}>
      <video
        preload="auto"
        loop={true}
        autoPlay={true}
        muted={true}
        width={width}
        height={height}
      >
        <source src={src} />
      </video>
    </Box>
  )
}
