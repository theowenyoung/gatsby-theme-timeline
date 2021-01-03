/** @jsx jsx */
import { jsx, Styled, Link as LinkUI } from "theme-ui"
import processTweetString from "./process-tweet-string"
import Hero from "./item-hero"
const Detail = ({ item }) => {
  const { idStr, datetime, author, authorScreenName } = item
  const body = processTweetString(item.body)
  return (
    <Styled.div sx={{ maxWidth: `550px`, fontSize: 2 }}>
      <Styled.blockquote className="twitter-tweet">
        <Styled.p>{body}</Styled.p>
        <Hero item={item}></Hero>
        &mdash; {author} (@{authorScreenName}){` `}
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
