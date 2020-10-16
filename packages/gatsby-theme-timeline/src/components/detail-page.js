import React from "react"
import Layout from "./layout"
import SEO from "./seo"
import CoreDetail from "gatsby-theme-timeline-core/src/components/detail"
import DetailFooter from "./detail-footer"
import { Grid } from "theme-ui"
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
  <Layout location={location} title={title}>
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

    <Grid gap={4} columns={[1, 1, `2fr 1fr`]}>
      <main>
        <CoreDetail {...item}></CoreDetail>
        <DetailFooter {...{ previous, next }} />
      </main>
      <aside>
        <Bio></Bio>
      </aside>
    </Grid>
  </Layout>
)

export default Detail
