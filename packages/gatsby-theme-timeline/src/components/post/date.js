/** @jsx jsx */
import { Styled, jsx } from "theme-ui"

const PostDate = (props) => (
  <Styled.p
    sx={{
      mt: -3,
      mb: 3,
      color: `textMuted`,
    }}
    {...props}
  />
)

export default PostDate
