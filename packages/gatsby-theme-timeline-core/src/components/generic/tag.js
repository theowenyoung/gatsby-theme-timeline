import React from "react"
import { Link, withPrefix } from "gatsby"
const Tag = ({ children }) => (
  <span>
    <Link to={withPrefix(`/tags/${encodeURIComponent(children)}`)}>
      #{children}
    </Link>
    {` `}
  </span>
)

export default Tag
