import React from "react"
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
        <p>{item.body}</p>
      </section>
    </article>
  )
}

export default Detail
