import React from "react"
import { Styled, css } from "theme-ui"

const Footer = () => (
  <footer
    css={css({
      mt: 4,
      pt: 3,
    })}
  >
    © {new Date().getFullYear()}, Powered by
    {` `}
    <Styled.a href="https://www.gatsbyjs.org">Gatsby</Styled.a>
  </footer>
)
export default Footer
