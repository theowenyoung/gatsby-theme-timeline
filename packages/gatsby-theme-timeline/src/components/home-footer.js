import React from "react"
import { css, Link as LinkUI } from "theme-ui"

const Footer = () => (
  <footer
    css={css({
      mt: 4,
      pt: 3,
    })}
  >
    © {new Date().getFullYear()}, Powered by
    {` `}
    <LinkUI data-test="powered-link" href="https://www.gatsbyjs.com">
      Gatsby
    </LinkUI>
    {` `}
    Theme by
    {` `}
    <LinkUI
      data-test="theme-link"
      href="https://github.com/theowenyoung/gatsby-theme-timeline"
    >
      Timeline
    </LinkUI>
  </footer>
)
export default Footer
