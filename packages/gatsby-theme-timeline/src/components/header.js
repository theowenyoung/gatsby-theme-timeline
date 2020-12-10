/** @jsx jsx */
import { Styled, jsx, Flex } from "theme-ui"
import Title from "./header-title"
import HeaderMenu from "./header-menu"
import HeaderRight from "./header-right"
const Header = (props) => {
  const { menuLinks, title, type } = props
  return (
    <header sx={{ px: [3, 4], mb: 4, maxWidth: `5xl`, mx: `auto` }}>
      <Styled.div
        sx={{
          pt: 3,
          pb: type === `detail` ? 2 : 3,
          borderBottomStyle: `solid`,
          borderBottomWidth: 1,
          borderBottomColor: `muted`,
        }}
      >
        <Styled.div
          sx={{
            display: `flex`,
            alignItems: `baseline`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
          }}
        >
          <Flex
            sx={{
              alignItems: `baseline`,
              flexWrap: `wrap`,
              flexGrow: 1,
            }}
          >
            <Title {...props}>{title}</Title>
            <HeaderMenu menuLinks={menuLinks}></HeaderMenu>
          </Flex>

          <HeaderRight></HeaderRight>
        </Styled.div>
      </Styled.div>
    </header>
  )
}

export default Header
