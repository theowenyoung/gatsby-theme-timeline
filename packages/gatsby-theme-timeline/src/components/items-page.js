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
import path from "path"
import kebabCase from "lodash/kebabCase"
import itemFormat from "./item-format"
const Items = ({ location, data, pageContext }) => {
  const { pageType, tag, currentPage, totalPages, basePath } = pageContext
  const items = data.allBlogPost.nodes
  const {
    site: {
      siteMetadata: { social, title },
    },
    tagsGroup: { group },
  } = data

  return (
    <Layout basePath={basePath} location={location} title={title}>
      <SEO title="Home" />
      <ItemsTitle
        pageType={pageType}
        tag={tag}
        basePath={basePath}
      ></ItemsTitle>
      <Grid gap={[null, null, 4, 5]} columns={[1, 1, `2fr 1fr`]}>
        <main>
          {items.map((item, index) => {
            return (
              <ItemBox
                key={`item-box-${index}`}
                basePath={basePath}
                {...itemFormat(item)}
              ></ItemBox>
            )
          })}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hideFirstAndLastPageLinks
            prefix={withPrefix(
              path.join(
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
