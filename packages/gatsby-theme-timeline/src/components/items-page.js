import React from "react"
import { withPrefix } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"
import Footer from "./home-footer"
import Bio from "./bio"
import Tags from "./tags"
import Links from "./links"
import ItemBox from "./item-box"
import { Grid } from "theme-ui"
import Pagination from "./pagination"
import ItemsTitle from "./items-title"
import * as urlJoin from "url-join"
import kebabCase from "lodash/kebabCase"

const Items = ({
  location,
  data,
  pageContext: { pageType, tag, currentPage, totalPages },
}) => {
  const items = data.allBlogPost.nodes
  const {
    site: {
      siteMetadata: { social, title },
    },
    timelineThemeConfig: { basePath },
    tagsGroup: { group },
  } = data

  return (
    <Layout location={location} title={title}>
      <SEO title="Home" />
      <ItemsTitle
        pageType={pageType}
        tag={tag}
        basePath={basePath}
      ></ItemsTitle>
      <Grid gap={[null, null, 4, 5]} columns={[1, 1, `2fr 1fr`]}>
        <main>
          {items.map((item, index) => {
            return <ItemBox key={`item-box-${index}`} {...item}></ItemBox>
          })}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hideFirstAndLastPageLinks
            prefix={withPrefix(
              urlJoin(
                basePath,
                pageType === `tag` ? `tags/${kebabCase(tag)}` : ``
              )
            )}
          ></Pagination>
        </main>
        <aside>
          <Bio></Bio>
          <Tags basePath={basePath} group={group}></Tags>
          <Links links={social}></Links>
        </aside>
      </Grid>
      <Footer />
    </Layout>
  )
}
export default Items
