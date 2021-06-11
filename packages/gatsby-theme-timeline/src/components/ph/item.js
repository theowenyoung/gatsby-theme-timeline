/** @jsx jsx */
import { withPrefix } from "gatsby"
import { Box, jsx, Themed } from "theme-ui"
import Tag from "../item-tag"
import kebabCase from "lodash/kebabCase"
import Hero from "./item-hero"
import { join as urlJoin } from "path-browserify"
import ItemHeader from "./item-header"
import ItemTitle from "./item-title"
import ItemExcerpt from "./item-excerpt"
import ItemFooter from "./item-footer"
import ItemVideo from "../item-video"
const Item = (props) => {
  const { item, basePath } = props
  const { title, tags } = item
  return (
    <Box
      sx={{
        borderRadius: `default`,
        overflow: `hidden`,
        wordWrap: `break-word`,
        borderWidth: 1,
        borderStyle: `solid`,
        borderColor: `muted`,
        px: [3, 4],
        pt: 3,
        pb: 4,
      }}
    >
      <ItemHeader {...props}></ItemHeader>
      <Hero {...props}></Hero>
      <ItemVideo {...props}></ItemVideo>
      {title && <ItemTitle {...props}></ItemTitle>}
      <ItemExcerpt {...props}></ItemExcerpt>
      {tags && tags.length > 0 && (
        <Themed.div
          data-test="item-tags"
          sx={{
            display: `flex`,
            flexWrap: `wrap`,
            pb: 3,
          }}
        >
          {tags &&
            tags.map((tag) => {
              return (
                <Tag
                  to={withPrefix(urlJoin(basePath, `tags/${kebabCase(tag)}`))}
                  key={`tag-${tag}`}
                >
                  {tag}
                </Tag>
              )
            })}
        </Themed.div>
      )}
      <ItemFooter {...props}></ItemFooter>
    </Box>
  )
}

export default Item
