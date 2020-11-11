/** @jsx jsx */
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { css, Styled, Flex, jsx, Link as LinkUI } from "theme-ui"
import { withPrefix } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Tag from "./tag"
import { join as urlJoin } from "path"
const PostFooter = ({ previous, next, tags, basePath }) => (
  <footer
    css={css({
      pt: 3,
      pb: 4,
    })}
  >
    {tags && tags.length > 0 && (
      <Styled.div
        sx={{
          display: `flex`,
          flexWrap: `wrap`,
          mb: 3,
          fontSize: 2,
        }}
      >
        {tags &&
          tags.map((tag) => {
            return (
              <Tag
                to={withPrefix(
                  urlJoin(basePath || `/`, `tags/${kebabCase(tag)}`)
                )}
                key={`tag-${tag}`}
              >
                {tag}
              </Tag>
            )
          })}
      </Styled.div>
    )}
    {(previous || next) && (
      <Flex
        as="ul"
        sx={{
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
          pt: 3,
          fontSize: 2,
        }}
      >
        <li>
          {previous && (
            <LinkUI as={Link} to={previous.slug} rel="prev">
              ← {previous.title}
            </LinkUI>
          )}
        </li>
        <li>
          {next && (
            <LinkUI as={Link} to={next.slug} rel="next">
              {next.title} →
            </LinkUI>
          )}
        </li>
      </Flex>
    )}
  </footer>
)

export default PostFooter
