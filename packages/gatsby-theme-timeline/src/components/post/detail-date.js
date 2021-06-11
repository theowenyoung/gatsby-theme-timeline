/** @jsx jsx */
import { Themed, jsx } from "theme-ui"

const PostDate = (props) => (
  <Themed.p
    data-test="detail-post-date"
    sx={{
      color: `textMuted`,
      mb: 2,
    }}
    {...props}
  />
)

export default PostDate
