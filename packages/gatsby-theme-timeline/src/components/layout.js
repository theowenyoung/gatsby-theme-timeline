import React from "react"
import { css, Styled, Box } from "theme-ui"
import Header from "./header"
import useTimelineThemeConfig from "../hooks/configOptions"
import Helmet from "react-helmet"

const Layout = ({ children, ...props }) => {
  const timelineThemeConfig = useTimelineThemeConfig()
  const { webfontURL } = timelineThemeConfig

  return (
    <Styled.root>
      <Helmet>
        <link rel="stylesheet" href={webfontURL} />
      </Helmet>
      <Header {...props} />
      <Box
        css={css({
          maxWidth: `6xl`,
          mx: `auto`,
          px: 3,
          py: 4,
        })}
      >
        {children}
      </Box>
    </Styled.root>
  )
}

export default Layout
