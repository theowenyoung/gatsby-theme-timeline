import React from "react"
import SEO from "./seo"
import { getSrc } from "gatsby-plugin-image"

export default ({ item, location, siteMetadata }) => {
  return (
    <SEO
      siteMetadata={siteMetadata}
      title={item.title}
      description={item.excerpt}
      location={location}
      imageSource={
        item.socialImage
          ? getSrc(item.socialImage)
          : item.image
          ? getSrc(item.image)
          : item.imageRemote
      }
      imageAlt={item.imageAlt}
      pageType="detail"
      item={item}
    />
  )
}
