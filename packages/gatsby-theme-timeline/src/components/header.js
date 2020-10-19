/** @jsx jsx */
import { Link, withPrefix } from "gatsby"
import { css, Styled, jsx } from "theme-ui"

const Title = ({ children, type }) => {
  if (type === `detail`) {
    return (
      <Styled.h3 sx={{ mb: 4 }}>
        <Styled.a sx={{ color: `text` }} as={Link} to={withPrefix(`/`)}>
          {children}
        </Styled.a>
      </Styled.h3>
    )
  }
  return (
    <Styled.h1>
      <Styled.a sx={{ color: `text` }} as={Link} to={withPrefix(`/`)}>
        {children}
      </Styled.a>
    </Styled.h1>
  )
}

const Header = ({ children, title, ...props }) => (
  <header>
    <Styled.div
      css={css({
        maxWidth: `5xl`,
        mx: `auto`,
        px: 3,
        pt: 3,
      })}
    >
      <Styled.div
        css={css({
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
        })}
      >
        <Title {...props}>{title}</Title>
        {children}
      </Styled.div>
    </Styled.div>
  </header>
)

export default Header
