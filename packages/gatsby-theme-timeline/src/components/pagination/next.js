import React from "react"
import { Link, withPrefix } from "gatsby"
import { Link as LinkUI } from "theme-ui"
export default function NextPageLink({ prefix }, props) {
  return (
    <LinkUI
      disabled={props.disabled}
      as={Link}
      to={withPrefix(
        props.value === 1 ? `${prefix}` : `${prefix}page/${props.value}`
      )}
      sx={{
        color: `textMuted`,
      }}
    >
      »
    </LinkUI>
  )
}
