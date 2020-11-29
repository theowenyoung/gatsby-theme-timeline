/** @jsx jsx */
import { css, Styled, jsx } from "theme-ui"
import Title from "./header-title"
import HeaderMenu from "./header-menu"
const Header = (props) => {
  const { menuLinks, title, type } = props
  return (
    <header sx={{ px: [3, 4], mb: 4, maxWidth: `5xl`, mx: `auto` }}>
      <Styled.div
        css={css({
          pt: 3,
          pb: type === `detail` ? 2 : 3,
          borderBottomStyle: `solid`,
          borderBottomWidth: 1,
          borderBottomColor: `muted`,
        })}
      >
        <Styled.div
          css={css({
            display: `flex`,
            alignItems: `baseline`,
            flexWrap: `wrap`,
          })}
        >
          <Title {...props}>{title}</Title>
          <HeaderMenu menuLinks={menuLinks}></HeaderMenu>
        </Styled.div>
      </Styled.div>
    </header>
  )
}

export default Header
