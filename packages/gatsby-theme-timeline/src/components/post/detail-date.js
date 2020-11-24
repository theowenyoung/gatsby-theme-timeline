/** @jsx jsx */
import { Styled, jsx } from "theme-ui"

const PostDate = (props) => (
  <Styled.p
    sx={{
      color: `textMuted`,
      mb: 2,
    }}
    {...props}
  />
)

export default PostDate
