import React from "react"

import Layout from "./layout"
import SEO from "./seo"
import Footer from "./home-footer"
import Bio from "./bio"
import ItemBox from "./item-box"
import { Grid } from "theme-ui"

const Items = ({ location, items, siteTitle, socialLinks }) => (
  <Layout location={location} title={siteTitle}>
    <SEO title="Home" />
    <Grid gap={4} columns={[1, 1, `2fr 1fr`]}>
      <main>
        {items.map((item, index) => {
          return <ItemBox key={`item-box-${index}`} {...item}></ItemBox>
        })}
      </main>
      <aside>
        <Bio></Bio>
      </aside>
    </Grid>

    <Footer socialLinks={socialLinks} />
  </Layout>
)

export default Items
