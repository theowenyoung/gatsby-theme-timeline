/** @jsx jsx */
import { MDXRenderer } from "gatsby-plugin-mdx"
import Hero from "./hero"
import Title from "./title"
import PostDate from "./date"
import { withPrefix } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Tag from "../tag"
import { Styled, jsx } from "theme-ui"
const Detail = (post) => {
  return (
    <article>
      <header>
        <PostDate>{post.date}</PostDate>
        <Hero post={post} />
        <Title>{post.title}</Title>
      </header>
      <section>
        <MDXRenderer>{post.body}</MDXRenderer>
      </section>
      {post.tags && post.tags.length > 0 && (
        <Styled.div
          sx={{
            display: `flex`,
            flexWrap: `wrap`,
            pb: 3,
            fontSize: 2,
          }}
        >
          {post.tags &&
            post.tags.map((tag) => {
              return (
                <Tag
                  to={withPrefix(`/tags/${kebabCase(tag)}`)}
                  key={`tag-${tag}`}
                >
                  {tag}
                </Tag>
              )
            })}
        </Styled.div>
      )}
    </article>
  )
}

export default Detail
