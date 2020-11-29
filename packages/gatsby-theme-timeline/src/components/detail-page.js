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
    site: {
      siteMetadata: { title, menuLinks },
    },
  },
  location,
}) => {
  const item = blogPost
  const basePath = item?.fields?.basePath || `/`
  return (
    <Layout
      basePath={basePath}
      menuLinks={menuLinks}
      location={location}
      title={title}
      type="detail"
    >
      <DetailSEO item={item}></DetailSEO>
      <main>
        <Detail item={item}></Detail>
        <DetailFooter
          {...{
            previous,
            next,
            basePath: basePath,
            item,
          }}
        />
      </main>
    </Layout>
  )
}

export default DetailPage
