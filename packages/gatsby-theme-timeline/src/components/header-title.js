/** @jsx jsx */
import { withPrefix } from "gatsby"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { Themed, jsx, Link as LinkUI } from "theme-ui"

const Title = ({ children, basePath }) => {
  return (
    <Themed.h3 sx={{ mb: 2, mt: 2, mr: [3, 4] }}>
      <LinkUI
        data-test="site-title"
        sx={{ color: `text` }}
        as={Link}
        to={withPrefix(basePath)}
      >
        {children}
      </LinkUI>
    </Themed.h3>
  )
}
export default Title
