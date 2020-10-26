/** @jsx jsx */
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import { Flex, Box, jsx, Styled } from "theme-ui"
import kebabCase from "lodash/kebabCase"
import Tag from "./tag"
import * as urlJoin from "url-join"

const Tags = ({ basePath }) => {
  const data = useStaticQuery(tagsQuery)
  const {
    tagsGroup: { group },
  } = data

  return (
    <Box>
      <Styled.h4 sx={{ color: `text` }}>Tags</Styled.h4>
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

const tagsQuery = graphql`
  query TagsQuery {
    tagsGroup: allBlogPost(sort: { fields: [date, slug], order: DESC }) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default Tags
