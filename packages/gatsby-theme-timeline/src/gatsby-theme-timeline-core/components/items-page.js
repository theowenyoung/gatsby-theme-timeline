import React from "react"
import ItemsPage from "../../components/items-page"

const ItemsWrapper = ({ location, data, pageContext }) => {
  const { site, allItem } = data
  return (
    <ItemsPage
      location={location}
      items={allItem.nodes}
      siteTitle={site.siteMetadata.title}
      socialLinks={site.siteMetadata.social}
      pageContext={pageContext}
    />
  )
}

export default ItemsWrapper
