import React from "react"
import SEO from "./seo"

export default ({ item }) => {
  return (
    <SEO
      title={item.title}
      description={item.excerpt}
      imageSource={
        item.socialImage
          ? item.socialImage?.childImageSharp?.fluid.src
          : item.image?.childImageSharp?.fluid.src
      }
      imageAlt={item.imageAlt}
    />
  )
}
