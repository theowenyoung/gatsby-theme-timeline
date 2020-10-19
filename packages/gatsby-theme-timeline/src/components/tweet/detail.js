/** @jsx jsx */
import { Tweet } from "react-twitter-widgets"
import { jsx, Alert } from "theme-ui"
const Detail = ({ idStr }) => {
  return (
    <Tweet
      tweetId={idStr}
      renderError={(_err) => {
        return <Alert>{`${_err}`}</Alert>
      }}
      options={{
        dnt: true,
      }}
    />
  )
}
export default Detail
