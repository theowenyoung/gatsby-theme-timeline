import React from "react"
import { withPrefix } from "gatsby"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { Link as LinkUI } from "theme-ui"
import { join as urlJoin } from "path"
export default function NextPageLink({ prefix, pagePath }, props) {
  return (
    <LinkUI
      disabled={props.disabled}
      as={Link}
      to={withPrefix(
        props.value === 1
          ? `${prefix}`
          : urlJoin(prefix, `${pagePath}/${props.value}`)
      )}
      sx={{
        color: `textMuted`,
      }}
    >
      »»
    </LinkUI>
  )
}
