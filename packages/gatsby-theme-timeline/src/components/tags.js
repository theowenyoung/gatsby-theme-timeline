/** @jsx jsx */
import { withPrefix } from "gatsby"
import { Flex, Box, jsx } from "theme-ui"
import kebabCase from "lodash/kebabCase"
import Tag from "./tag"
import { join as urlJoin } from "path-browserify"
import TagsTitle from "./tags-title"
const Tags = ({ basePath, group }) => {
  return (
    <Box data-test="tags-container">
      <TagsTitle></TagsTitle>
      <Flex sx={{ mb: 3, flexWrap: `wrap` }}>
        {group.map(({ fieldValue, totalCount }, index) => {
          return (
            <Tag
              key={`tag-list-${index}`}
              count={totalCount}
              to={withPrefix(
                urlJoin(basePath, `/tags/${kebabCase(fieldValue)}/`)
              )}
            >
              {fieldValue}
            </Tag>
          )
        })}
      </Flex>
    </Box>
  )
}

export default Tags
