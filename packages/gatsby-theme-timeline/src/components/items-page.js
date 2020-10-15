import React from "react"

import Layout from "./layout"
import SEO from "./seo"
import Footer from "./home-footer"
import Item from "gatsby-theme-timeline-core/src/components/item"

const Items = ({ location, items, siteTitle, socialLinks }) => (
  <Layout location={location} title={siteTitle}>
    <SEO title="Home" />
    <main>
      {items.map((item, index) => (
        <Item key={`item-box-${index}`} {...item}></Item>
      ))}
    </main>
    <Footer socialLinks={socialLinks} />
  </Layout>
)

export default Items
