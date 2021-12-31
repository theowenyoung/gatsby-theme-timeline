import React from "react"
import { withPrefix } from "gatsby"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { Link as LinkUI, Text } from "theme-ui"
import { join as urlJoin } from "path-browserify"
export default function Page({ prefix, pagePath }, props) {
  const isDisabled = props.disabled || props.isActive
  if (isDisabled) {
    return (
      <Text
        sx={{
          px: 2,
          fontWeight: props.isActive ? `bold` : undefined,
          color: props.isActive ? `text` : `textMuted`,
        }}
      >
        {props.value}
      </Text>
    )
  }
  return (
    <LinkUI
      as={Link}
      to={withPrefix(
        props.value === 1
          ? `${prefix}`
          : urlJoin(`${prefix}`, `${pagePath}/${props.value}/`)
      )}
      sx={{
        px: 2,
        color: `textMuted`,
      }}
    >
      {props.value}
    </LinkUI>
  )
}
