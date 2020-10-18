/** @jsx jsx */
import { Link } from "gatsby"
import { css, Styled, Flex, jsx } from "theme-ui"

const PostFooter = ({ previous, next }) => (
  <footer
    css={css({
      pt: 3,
      pb: 4,
    })}
  >
    {(previous || next) && (
      <Flex
        as="ul"
        sx={{
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
          fontSize: 2,
        }}
      >
        <li>
          {previous && (
            <Styled.a as={Link} to={previous.slug} rel="prev">
              ← {previous.title}
            </Styled.a>
          )}
        </li>
        <li>
          {next && (
            <Styled.a as={Link} to={next.slug} rel="next">
              {next.title} →
            </Styled.a>
          )}
        </li>
      </Flex>
    )}
  </footer>
)

export default PostFooter
