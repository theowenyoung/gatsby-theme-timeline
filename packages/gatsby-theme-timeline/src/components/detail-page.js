import React from "react"
import Layout from "./layout"
import DetailFooter from "./detail-footer"
import Detail from "./detail"
import DetailSEO from "./detail-seo"
const DetailPage = ({
  data: {
    blogPost,
    previous,
    next,
    site: { siteMetadata },
  },
  location,
  pageContext,
}) => {
  const { title, menuLinks } = siteMetadata
  const item = blogPost
  const basePath = item?.fields?.basePath || `/`
  return (
    <Layout
      basePath={basePath}
      menuLinks={menuLinks}
      location={location}
      title={title}
      pageType="detail"
      pageContext={pageContext}
      siteMetadata={siteMetadata}
    >
      <DetailSEO
        location={location}
        pageContext={pageContext}
        item={item}
      ></DetailSEO>
      <main>
        <Detail
          item={item}
          pageContext={pageContext}
          location={location}
        ></Detail>
        <DetailFooter
          {...{
            previous,
            next,
            basePath: basePath,
            item,
            pageContext,
          }}
        />
      </main>
    </Layout>
  )
}

export default DetailPage
