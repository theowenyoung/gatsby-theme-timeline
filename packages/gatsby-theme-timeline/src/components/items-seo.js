import React from "react"
import SEO from "./seo"

export default ({ pageContext }) => {
  const { pageType, tag } = pageContext
  let title = `Home`
  if (pageType === `tag`) {
    title = tag
  }
  return <SEO title={title} />
}
