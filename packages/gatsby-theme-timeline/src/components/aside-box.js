/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from "react"
import { jsx, Themed } from "theme-ui"
import Bio from "./bio"
import Tags from "./tags"
import Links from "./links"
const Aside = ({ data, pageContext, siteMetadata }) => {
  const { basePath } = pageContext
  const {
    tagsGroup: { group },
  } = data
  const { social } = siteMetadata
  const sideItems = (
    <>
      <Bio basePath={basePath} siteMetadata={siteMetadata}></Bio>
      <Tags basePath={basePath} group={group}></Tags>
      <Links siteMetadata={siteMetadata} links={social}></Links>
    </>
  )
  return (
    <Themed.div
      data-test="aside"
      as="aside"
      sx={{ height: [null, null, `full`] }}
    >
      <Themed.div
        sx={{
          top: [null, null, 4],
          position: [null, null, `sticky`],
          overflowY: [null, null, `auto`],
          height: [null, null, `calc(100vh - 32px)`],
          overscrollBehavior: [null, null, `contain`],
          px: [null, null, 4],
        }}
      >
        {sideItems}
      </Themed.div>
    </Themed.div>
  )
}
export default Aside
