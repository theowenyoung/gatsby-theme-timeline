import React from "react"
import { withPrefix } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"
import Footer from "./home-footer"
import Bio from "./bio"
import Tags from "./tags"
import ItemBox from "./item-box"
import { Grid } from "theme-ui"
import Pagination from "./pagination"
import kebabCase from "lodash/kebabCase"
import ItemsTitle from "./items-title"
import Links from "./links"
const Items = ({
  location,
  items,
  siteTitle,
  pageContext: { type, tag, currentPage, totalPages },
}) => {
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <ItemsTitle type={type} tag={tag}></ItemsTitle>
      <Grid gap={4} columns={[1, 1, `2fr 1fr`]}>
        <main>
          {items.map((item, index) => {
            return <ItemBox key={`item-box-${index}`} {...item}></ItemBox>
          })}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hideFirstAndLastPageLinks
            prefix={withPrefix(
              type === `tag` ? `/tags/${kebabCase(tag)}/` : `/`
            )}
          ></Pagination>
        </main>
        <aside>
          <Bio></Bio>
          <Tags></Tags>
          <Links></Links>
        </aside>
      </Grid>
      <Footer />
    </Layout>
  )
}
export default Items
