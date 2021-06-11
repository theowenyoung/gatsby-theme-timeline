/** @jsx jsx */
import { jsx } from "theme-ui"
import { withPrefix } from "gatsby"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { Link as LinkUI } from "theme-ui"
import { join as urlJoin } from "path-browserify"

export default function PreviousPageLink({ prefix, pagePath }, props) {
  if (props.isActive) {
    return (
      <div
        sx={{
          flexGrow: 1,
          textAlign: `left`,
        }}
      ></div>
    )
  }
  return (
    <div
      sx={{
        flexGrow: 1,
        textAlign: `left`,
      }}
    >
      <LinkUI
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
        &larr; Previous
      </LinkUI>
    </div>
  )
}
