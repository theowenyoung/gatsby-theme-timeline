/** @jsx jsx */
import Layout from "./layout"
import Footer from "./home-footer"
import Bio from "./bio"
import Tags from "./tags"
import Links from "./links"
import ItemBox from "./item-box"
import { jsx, Grid } from "theme-ui"
import ItemsTitle from "./items-title"
import itemFormat from "./item-format"
import AsideBox from "./aside-box"
import ItemsSEO from "./items-seo"
import ItemsFooter from "./items-footer"
const Items = ({ location, data, pageContext }) => {
  const { pageType, tag, basePath } = pageContext
  const items = data.allBlogPost.nodes
  const {
    site: {
      siteMetadata: { social, title },
    },
    tagsGroup: { group },
  } = data

  return (
    <Layout basePath={basePath} location={location} title={title}>
      <ItemsSEO pageType={pageType} tag={tag} />
      <ItemsTitle
        pageType={pageType}
        tag={tag}
        basePath={basePath}
      ></ItemsTitle>
      <Grid gap={[null, null, 3, 4]} columns={[1, 1, `2fr 1fr`]}>
        <main sx={{ minWidth: 0 }}>
          {items.map((item, index) => {
            return (
              <ItemBox
                key={`item-box-${index}`}
                basePath={basePath}
                item={itemFormat(item)}
              ></ItemBox>
            )
          })}
          <ItemsFooter pageContext={pageContext}></ItemsFooter>
        </main>
        <AsideBox>
          <Bio basePath={basePath}></Bio>
          <Tags basePath={basePath} group={group}></Tags>
          <Links links={social}></Links>
        </AsideBox>
      </Grid>
      <Footer />
    </Layout>
  )
}
export default Items
