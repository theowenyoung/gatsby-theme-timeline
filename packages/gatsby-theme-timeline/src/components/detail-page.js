import React from "react"
import Layout from "./layout"
import SEO from "./seo"
import DetailFooter from "./detail-footer"
import Bio from "./bio"
import Detail from "./detail"
const DetailPage = ({
  data: {
    blogPost,
    previous,
    next,
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {
  const item = blogPost
  return (
    <Layout
      basePath={item.basePath || "/"}
      location={location}
      title={title}
      type="detail"
    >
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
        <Detail {...item}></Detail>
        <DetailFooter
          {...{ previous, next, tags: item.tags, basePath: item.basePath }}
        />
      </main>
      <aside>
        <Bio></Bio>
      </aside>
    </Layout>
  )
}

export default DetailPage
