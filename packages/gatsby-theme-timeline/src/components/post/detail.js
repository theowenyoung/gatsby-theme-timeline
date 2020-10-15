import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Hero from "./hero"
import Title from "./title"
import PostDate from "./date"
const Detail = (post) => {
  return (
    <article>
      <header>
        <Hero post={post} />
        <Title>{post.title}</Title>
        <PostDate>{post.date}</PostDate>
      </header>
      <section>
        <MDXRenderer>{post.body}</MDXRenderer>
      </section>
    </article>
  )
}

export default Detail
