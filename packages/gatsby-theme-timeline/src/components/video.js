/** @jsx jsx */
import { jsx, Box } from "theme-ui"

export default function Video({ src, width, height }) {
  return (
    <figure sx={{ m: 0 }}>
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
    </figure>
  )
}
