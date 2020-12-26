/** @jsx jsx */
import { jsx } from "theme-ui"
import { YOUTUBE_PRIMARY_COLOR } from "./constans"
const Logo = () => {
  return (
    <svg
      enableBackground="new 0 0 1000 1000"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        width: `24px`,
        height: `24px`,
      }}
    >
      <path
        d="m500 1000c-276.1 0-500-223.9-500-500 0-276.1 223.9-500 500-500 276.1 0 500 223.9 500 500 0 276.1-223.9 500-500 500z"
        fill={YOUTUBE_PRIMARY_COLOR}
      />
      <path
        d="m818.2 339.1c-7.6-28.8-30.1-51.4-58.7-59.1-51.8-14-259.4-14-259.4-14s-207.7 0-259.4 14c-28.6 7.7-51.1 30.3-58.7 59.1-14 52.1-14 160.9-14 160.9s0 108.8 13.9 160.9c7.6 28.8 30.1 51.4 58.7 59.1 51.8 14 259.4 14 259.4 14s207.7 0 259.4-14c28.6-7.7 51.1-30.3 58.7-59.1 13.9-52.1 13.9-160.9 13.9-160.9s0-108.8-13.8-160.9zm-386.1 259.6v-197.4l173.5 98.7z"
        fill="#fff"
      />
    </svg>
  )
}
export default Logo
