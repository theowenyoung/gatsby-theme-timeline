import React from "react"
import { Link, withPrefix } from "gatsby"
import kebabCase from "lodash/kebabCase"

const Tag = ({ children }) => (
  <span>
    <Link to={withPrefix(`/tags/${kebabCase(children)}`)}>#{children}</Link>
    {` `}
  </span>
)

export default Tag
