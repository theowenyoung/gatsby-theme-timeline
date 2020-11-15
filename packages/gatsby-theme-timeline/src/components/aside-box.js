/** @jsx jsx */

import { jsx, Styled } from "theme-ui"

const Aside = ({ children }) => {
  return (
    <Styled.div as="aside" sx={{ height: `full` }}>
      <Styled.div sx={{ top: 4, position: `sticky` }}>{children}</Styled.div>
    </Styled.div>
  )
}
export default Aside
