/** @jsx jsx */
import Hero from "./post/hero"
import Title from "./post/detail-title"
import PostDate from "./post/detail-date"
import { jsx } from "theme-ui"

const Detail = ({ item }) => {
  const post = item
  return (
    <article>
      <header>
        <PostDate>{post.date}</PostDate>
        <Hero post={post} />
        <Title sx={{ mb: 4, mt: 3 }}>{post.title}</Title>
      </header>
      <section
        sx={{
          fontSize: `1.125rem`,
          img: {
            maxWidth: `full`,
            margin: `0 auto`,
            display: `block`,
            pb: 4,
          },
        }}
      >
        {post.body}
      </section>
    </article>
  )
}

export default Detail
