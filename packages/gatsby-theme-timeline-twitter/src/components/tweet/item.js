import React from "react"
import { Link } from "gatsby"
const Item = ({ title, slug, date, excerpt, tags }) => {
  return (
    <div>
      <section>
        <p>{excerpt}</p>
      </section>
      <footer>
        <section>
          {tags &&
            tags.map((tag) => {
              return <span key={`tag-${tag}`}>{tag}</span>
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
