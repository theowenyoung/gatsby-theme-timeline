import React from "react"
import SEO from "./seo"

export default ({ item, location }) => {
  return (
    <SEO
      title={item.title}
      description={item.excerpt}
      location={location}
      imageSource={
        item.socialImage
          ? item.socialImage?.childImageSharp?.fluid.src
          : item.image?.childImageSharp?.fluid.src && item.imageRemote
      }
      imageAlt={item.imageAlt}
      pageType="detail"
      item={item}
    />
  )
}
