import React from "react"
import { css, Themed, Box } from "theme-ui"
import Header from "./header"
import useTimelineThemeConfig from "../hooks/configOptions"
import Helmet from "react-helmet"

const Layout = ({ children, ...props }) => {
  const timelineThemeConfig = useTimelineThemeConfig()
  const { webfontURL } = timelineThemeConfig
  return (
    <Themed.root>
      <Helmet>
        <link rel="stylesheet" href={webfontURL} />
      </Helmet>
      <Header {...props} />
      <Box
        css={css({
          maxWidth: [`full`, `5xl`],
          mx: `auto`,
          px: [3, 4],
          pb: 4,
        })}
      >
        {children}
      </Box>
    </Themed.root>
  )
}

export default Layout
