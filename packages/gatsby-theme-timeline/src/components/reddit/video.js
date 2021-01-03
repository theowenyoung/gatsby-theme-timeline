/** @jsx jsx */
import { jsx, Box } from "theme-ui"

export default function Video({ src, width, height, embed }) {
  if (embed) {
    return (
      <Box sx={{ maxWidth: `full` }}>
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
    <Box sx={{ display: `flex`, justifyContent: `center`, maxWidth: `full` }}>
      <video
        preload="auto"
        loop={true}
        autoPlay={true}
        muted={true}
        width={width}
        height={height}
        sx={{ maxWidth: `full`, width: `full`, height: `full` }}
      >
        <source src={src} />
      </video>
    </Box>
  )
}
