import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Title from "../generic/title"
import Date from "../generic/date"
import Hero from "../generic/hero"

const Detail = (item) => {
  return (
    <article>
      <header>
        <Hero post={item} />
        <Title>{item.title}</Title>
        <Date>{item.date}</Date>
      </header>
      <section>
        <MDXRenderer>{item.body}</MDXRenderer>
      </section>
    </article>
  )
}

export default Detail
