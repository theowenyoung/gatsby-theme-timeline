/** @jsx jsx */
import { jsx, Styled, Link as LinkUI } from "theme-ui"
import processTweetString from "./process-tweet-string"
import Hero from "./item-hero"
const Detail = ({ item }) => {
  const { url, datetime, author, authorSlug } = item
  const body = processTweetString(item.title)
  return (
    <Styled.div sx={{ maxWidth: `550px`, fontSize: 2 }}>
      <Styled.blockquote className="twitter-tweet">
        <Styled.p>{body}</Styled.p>
        <Hero item={item}></Hero>
        &mdash; {author} (@{authorSlug}){` `}
        <LinkUI href={url}>{datetime}</LinkUI>
      </Styled.blockquote>
    </Styled.div>
  )
}
export default Detail
