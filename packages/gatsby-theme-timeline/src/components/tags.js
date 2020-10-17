/** @jsx jsx */
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import { Flex, jsx } from "theme-ui"
import kebabCase from "lodash/kebabCase"
import Tag from "./post/tag"
const Tags = () => {
  const data = useStaticQuery(tagsQuery)
  const {
    tagsGroup: { group },
  } = data

  return (
    <Flex sx={{ mb: 4, gap: 2, flexWrap: `wrap` }}>
      {group.map(({ fieldValue, totalCount }, index) => {
        return (
          <Tag
            key={`tag-list-${index}`}
            to={withPrefix(`/tags/${kebabCase(fieldValue)}`)}
          >
            {fieldValue}
          </Tag>
        )
      })}
    </Flex>
  )
}

const tagsQuery = graphql`
  query TagsQuery {
    tagsGroup: allItem(sort: { fields: [date, slug], order: DESC }) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default Tags
