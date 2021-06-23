import React from "react"
import SEO from "./seo"

export default ({ pageContext, location, siteMetadata, image }) => {
  const { pageType, tag } = pageContext
  let title = `Home`
  let description = ``
  if (pageType === `tag`) {
    title = tag
    description = `See all posts about ${tag} at ${siteMetadata.title}`
  }
  return (
    <SEO
      siteMetadata={siteMetadata}
      title={title}
      description={description}
      imageSource={pageType === `home` ? null : image}
      pageType={pageType}
      location={location}
    />
  )
}
