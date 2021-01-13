/** @jsx jsx */

import { jsx, Styled } from "theme-ui"
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
    <Styled.div data-test="aside" as="aside" sx={{ height: `full` }}>
      <Styled.div sx={{ top: 4, position: `sticky` }}>
        <Bio basePath={basePath}></Bio>
        <Tags basePath={basePath} group={group}></Tags>
        <Links siteMetadata={siteMetadata} links={social}></Links>
      </Styled.div>
    </Styled.div>
  )
}
export default Aside
