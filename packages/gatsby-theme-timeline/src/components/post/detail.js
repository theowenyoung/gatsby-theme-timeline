/** @jsx jsx */
import { MDXRenderer } from "gatsby-plugin-mdx"
import Hero from "./hero"
import Title from "./title"
import PostDate from "./date"
import { jsx } from "theme-ui"

const Detail = (post) => {
  return (
    <article>
      <header>
        <PostDate>{post.date}</PostDate>
        <Hero post={post} />
        <Title sx={{ mb: 5, mt: 3 }}>{post.title}</Title>
      </header>
      <section
        sx={{
          fontSize: 2,
          img: {
            maxWidth: `full`,
            margin: `0 auto`,
            display: `block`,
            pb: 4,
          },
        }}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </section>
    </article>
  )
}

export default Detail
