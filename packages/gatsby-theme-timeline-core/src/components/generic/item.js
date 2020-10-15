import React from "react"
import { Link } from "gatsby"
import Tag from "./tag"
const Item = ({ title, slug, date, excerpt, tags }) => {
  return (
    <div>
      {title && (
        <header>
          <h2>{title}</h2>
        </header>
      )}

      <section>
        <p>{excerpt}</p>
      </section>
      <footer>
        <section>
          {tags &&
            tags.map((tag) => {
              return <Tag key={`tag-${tag}`}>{tag}</Tag>
            })}
        </section>
        <section>
          <p>
            <span>
              <Link to={slug}>{date}</Link>
            </span>
          </p>
        </section>
      </footer>
    </div>
  )
}

export default Item
