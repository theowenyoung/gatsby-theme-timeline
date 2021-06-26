/** @jsx jsx */
import { Flex, jsx } from "theme-ui"
export default function Wrapper(props) {
  let children = props.children
  if (children.length > 2) {
    children = [
      children[0],
      <Flex key="pagination-pages">
        {children.slice(1, children.length - 1)}
      </Flex>,
      children[children.length - 1],
    ]
  }

  return (
    <nav
      data-test="pagination"
      sx={{
        mb: 4,
        lineHeight: 2,
      }}
    >
      <Flex
        sx={{
          justifyContent: `space-between`,
          flexWrap: `wrap`,
          fontSize: 2,
        }}
      >
        {children}
      </Flex>
    </nav>
  )
}
