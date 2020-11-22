import React from "react"
import SEO from "./seo"

export default ({ pageType, tag }) => {
  let title = `Home`
  if (pageType === `tag`) {
    title = tag
  }
  return <SEO title={title} />
}
