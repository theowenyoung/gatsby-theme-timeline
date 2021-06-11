/** @jsx jsx */
import { jsx, Themed, Link as LinkUI } from "theme-ui"
import processTweetString from "./process-tweet-string"
import Hero from "./item-hero"
const Detail = ({ item }) => {
  const { url, datetime, author, authorSlug } = item
  const body = processTweetString(item.title)
  return (
    <Themed.div sx={{ maxWidth: `550px`, fontSize: 2 }}>
      <Themed.blockquote className="twitter-tweet">
        <Themed.p>{body}</Themed.p>
        <Hero item={item}></Hero>
        &mdash; {author} (@{authorSlug}){` `}
        <LinkUI href={url}>{datetime}</LinkUI>
      </Themed.blockquote>
    </Themed.div>
  )
}
export default Detail
