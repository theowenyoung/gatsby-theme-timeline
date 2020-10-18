import React from "react"
import Layout from "./layout"
import SEO from "./seo"
import CoreDetail from "gatsby-theme-timeline-core/src/components/detail"
import DetailFooter from "./detail-footer"
import Bio from "./bio"

const Detail = ({
  data: {
    item,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => (
  <Layout location={location} title={title} type="detail">
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

    <main>
      <CoreDetail {...item}></CoreDetail>
      <DetailFooter {...{ previous, next }} />
    </main>
    <aside>
      <Bio></Bio>
    </aside>
  </Layout>
)

export default Detail
