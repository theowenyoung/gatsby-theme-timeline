import React from "react"
import { Link, withPrefix } from "gatsby"
import { css, Styled } from "theme-ui"

const rootPath = withPrefix(`/`)

const Title = ({ children, location }) => {
  if (location.pathname === rootPath) {
    return (
      <Styled.h1
        css={css({
          my: 0,
          fontSize: 4,
        })}
      >
        <Styled.a
          as={Link}
          css={css({
            color: `inherit`,
            boxShadow: `none`,
            textDecoration: `none`,
          })}
          to={`/`}
        >
          {children}
        </Styled.a>
      </Styled.h1>
    )
  } else {
    return (
      <Styled.h3
        as="p"
        css={css({
          my: 0,
        })}
      >
        <Styled.a
          as={Link}
          css={css({
            boxShadow: `none`,
            textDecoration: `none`,
            color: `primary`,
          })}
          to={`/`}
        >
          {children}
        </Styled.a>
      </Styled.h3>
    )
  }
}

const Header = ({ children, title, ...props }) => (
  <header>
    <div
      css={css({
        maxWidth: `6xl`,
        mx: `auto`,
        px: 3,
        pt: 4,
      })}
    >
      <div
        css={css({
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
          mb: 4,
        })}
      >
        <Title {...props}>{title}</Title>
        {children}
      </div>
    </div>
  </header>
)

export default Header
