/** @jsx jsx */
import Layout from "./layout"
import Footer from "./home-footer"
import { getSrc } from "gatsby-plugin-image"

import ItemBox from "./item-box"
import { jsx, Grid } from "theme-ui"
import ItemsTitle from "./items-title"
import itemFormat from "./item-format"
import AsideBox from "./aside-box"
import ItemsSEO from "./items-seo"
import ItemsFooter from "./items-footer"
const Items = ({ location, data, pageContext }) => {
  const { basePath, pageType, siteMetadata } = pageContext

  const items = data.allBlogPost.nodes

  const { title, menuLinks } = siteMetadata
  let image = null
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    image = item.socialImage
      ? getSrc(item.socialImage)
      : item.image
      ? getSrc(item.image)
      : item.imageRemote
    if (image) {
      break
    }
  }

  return (
    <Layout
      basePath={basePath}
      location={location}
      menuLinks={menuLinks}
      title={title}
      pageType={pageType}
      pageContext={pageContext}
      siteMetadata={siteMetadata}
    >
      <ItemsSEO
        image={image}
        location={location}
        pageContext={pageContext}
        siteMetadata={siteMetadata}
      />
      <ItemsTitle pageContext={pageContext}></ItemsTitle>
      <Grid gap={[null, null, 3, 4]} columns={[1, 1, `2fr 1fr`]}>
        <main sx={{ minWidth: 0 }}>
          <section
            data-test="list-container"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <link href="https://schema.org/ItemListOrderDescending"></link>
            <meta itemProp="numberOfItems" content={items.length} />
            {items.map((item, index) => {
              return (
                <ItemBox
                  key={`item-box-${index}`}
                  index={index}
                  basePath={basePath}
                  item={itemFormat(item)}
                  pageContext={pageContext}
                ></ItemBox>
              )
            })}
          </section>

          <ItemsFooter pageContext={pageContext}></ItemsFooter>
        </main>
        <AsideBox
          location={location}
          data={data}
          pageContext={pageContext}
        ></AsideBox>
      </Grid>
      <Footer />
    </Layout>
  )
}
export default Items
