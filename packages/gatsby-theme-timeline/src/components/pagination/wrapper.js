/** @jsx jsx */
import { Flex, jsx } from "theme-ui"
export default function Wrapper(props) {
  return (
    <nav
      sx={{
        left: [null, null, 0],
        right: [null, null, 0],
        position: [null, null, `absolute`],
        pb: 4,
      }}
    >
      <Flex sx={{ gap: 4, justifyContent: `center`, fontSize: 2 }}>
        {props.children}
      </Flex>
    </nav>
  )
}
