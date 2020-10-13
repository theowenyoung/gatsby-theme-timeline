import React from "react"
import { css, Styled } from "theme-ui"
import Header from "./header"
import useTimelineThemeConfig from "../hooks/configOptions"
import Helmet from "react-helmet"
import { SkipNavContent } from "@reach/skip-nav"

const Layout = ({ children, ...props }) => {
  const timelineThemeConfig = useTimelineThemeConfig()
  const { webfontURL } = timelineThemeConfig

  return (
    <Styled.root>
      <Helmet>
        <link rel="stylesheet" href={webfontURL} />
      </Helmet>
      <Header {...props} />
      <SkipNavContent />
      <div>
        <div
          css={css({
            maxWidth: `container`,
            mx: `auto`,
            px: 3,
            py: 4,
          })}
        >
          {children}
        </div>
      </div>
    </Styled.root>
  )
}

export default Layout
