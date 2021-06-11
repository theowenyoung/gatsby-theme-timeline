/** @jsx jsx */

import { jsx, Themed } from "theme-ui"
import Bio from "./bio"
import Tags from "./tags"
import Links from "./links"
const Aside = ({ data, pageContext }) => {
  const { basePath } = pageContext
  const {
    site: { siteMetadata },
    tagsGroup: { group },
  } = data
  const { social } = siteMetadata
  return (
    <Themed.div data-test="aside" as="aside" sx={{ height: `full` }}>
      <Themed.div
        sx={{
          top: 4,
          position: `sticky`,
          overflowY: `auto`,
          height: `calc(100vh - 32px)`,
          overscrollBehavior: `contain`,
        }}
      >
        <Bio basePath={basePath}></Bio>
        <Tags basePath={basePath} group={group}></Tags>
        <Links siteMetadata={siteMetadata} links={social}></Links>
      </Themed.div>
    </Themed.div>
  )
}
export default Aside
