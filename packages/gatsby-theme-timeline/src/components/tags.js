/** @jsx jsx */
import { withPrefix } from "gatsby"
import { Flex, Box, jsx } from "theme-ui"
import kebabCase from "lodash/kebabCase"
import Tag from "./tag"
import { join as urlJoin } from "path"
import TagsTitle from "./tags-title"
const Tags = ({ basePath, group }) => {
  return (
    <Box>
      <TagsTitle></TagsTitle>
      <Flex sx={{ mb: 4, flexWrap: `wrap` }}>
        {group.map(({ fieldValue, totalCount }, index) => {
          return (
            <Tag
              key={`tag-list-${index}`}
              to={withPrefix(
                urlJoin(basePath, `/tags/${kebabCase(fieldValue)}`)
              )}
            >
              {`${fieldValue}(${totalCount})`}
            </Tag>
          )
        })}
      </Flex>
    </Box>
  )
}

export default Tags
