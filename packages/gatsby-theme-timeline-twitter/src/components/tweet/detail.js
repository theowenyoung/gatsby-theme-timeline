import React from "react"
import Hero from "./hero"
import PostDate from "./date"
const Detail = (post) => {
  return (
    <article>
      <header>
        <Hero post={post} />
        <PostDate>{post.date}</PostDate>
      </header>
      <section>
        <p>{post.body}</p>
      </section>
    </article>
  )
}

export default Detail
