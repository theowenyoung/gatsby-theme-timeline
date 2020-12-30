import React from "react"
import SEO from "./seo"

export default ({ pageContext, location, siteMetadata }) => {
  const { pageType, tag } = pageContext
  let title = `Home`
  let description = ``
  if (pageType === `tag`) {
    title = tag
    description = `See all posts about ${tag} at ${siteMetadata.title}`
  }
  return (
    <SEO
      title={title}
      description={description}
      pageType={pageType}
      location={location}
    />
  )
}
