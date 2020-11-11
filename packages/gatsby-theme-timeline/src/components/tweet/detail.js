/** @jsx jsx */
import { jsx, Styled, Link as LinkUI } from "theme-ui"
import processTweetString from "./process-tweet-string"
import Hero from "./hero"
const Detail = (post) => {
  const { idStr, datetime, authorName, authorScreenName } = post
  const body = processTweetString(post.body)
  return (
    <Styled.div sx={{ maxWidth: `550px`, fontSize: 2 }}>
      <Styled.blockquote className="twitter-tweet">
        <Styled.p>{body}</Styled.p>
        <Hero post={post}></Hero>
        &mdash; {authorName} (@{authorScreenName}){` `}
        <LinkUI
          href={`https://twitter.com/${authorScreenName}/status/${idStr}`}
        >
          {datetime}
        </LinkUI>
      </Styled.blockquote>
    </Styled.div>
  )
}
export default Detail
