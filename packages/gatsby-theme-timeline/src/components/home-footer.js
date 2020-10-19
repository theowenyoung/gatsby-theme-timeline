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
    <Styled.a href="https://www.gatsbyjs.com">Gatsby</Styled.a>
    {` `}
    Theme by
    {` `}
    <Styled.a href="https://github.com/theowenyoung/gatsby-theme-timeline">
      Timeline
    </Styled.a>
  </footer>
)
export default Footer
