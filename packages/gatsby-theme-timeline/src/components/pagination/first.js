import React from "react"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
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
