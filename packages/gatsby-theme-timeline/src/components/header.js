/** @jsx jsx */
import { css, Styled, jsx } from "theme-ui"
import Title from "./header-title"

const Header = ({ children, title, ...props }) => (
  <header>
    <Styled.div
      css={css({
        maxWidth: `5xl`,
        mx: `auto`,
        px: [3, 4],
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
