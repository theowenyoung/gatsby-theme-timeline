import React from "react"
import { Link } from "gatsby"
import { Link as LinkUI } from "theme-ui"
export default function PreviousPageLink({ prefix }, props) {
  return (
    <LinkUI
      disabled={props.disabled}
      as={Link}
      to={prefix}
      sx={{
        color: `textMuted`,
      }}
    >
      ««
    </LinkUI>
  )
}
