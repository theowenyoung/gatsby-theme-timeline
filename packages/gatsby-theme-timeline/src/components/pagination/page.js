import React from "react"
import { Link, withPrefix } from "gatsby"
import { Link as LinkUI, Text } from "theme-ui"
import * as urlJoin from "url-join"
export default function Page({ prefix }, props) {
  const isDisabled = props.disabled || props.isActive
  if (isDisabled) {
    return (
      <Text
        sx={{
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
          : urlJoin(`${prefix}`, `page/${props.value}`)
      )}
      sx={{
        color: `textMuted`,
      }}
    >
      {props.value}
    </LinkUI>
  )
}
