import React from "react"
import { Link, withPrefix } from "gatsby"
import { Link as LinkUI } from "theme-ui"
export default function PreviousPageLink(_, props) {
  return (
    <LinkUI
      disabled={props.disabled}
      as={Link}
      to={withPrefix(`/`)}
      sx={{
        color: `textMuted`,
      }}
    >
      ««
    </LinkUI>
  )
}
