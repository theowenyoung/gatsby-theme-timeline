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
      <Flex
        sx={{
          justifyContent: `center`,
          fontSize: 2,
          "a:nth-of-type(1)": {
            ml: 0,
          },
          "a:nth-of-type(n+2)": {
            ml: 3,
          },
          "div:nth-of-type(n)": {
            ml: 3,
          },
        }}
      >
        {props.children}
      </Flex>
    </nav>
  )
}
