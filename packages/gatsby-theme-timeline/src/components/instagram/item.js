/** @jsx jsx */
import { withPrefix } from "gatsby"
import { Box, jsx, Styled } from "theme-ui"
import Tag from "../item-tag"
import kebabCase from "lodash/kebabCase"
import Hero from "./item-hero"
import { join as urlJoin } from "path"
import ItemHeader from "./item-header"
import ItemExcerpt from "./item-excerpt"
import ItemFooter from "./item-footer"
import ItemVideo from "../item-video"
const Item = (props) => {
  const { item, basePath } = props
  const { tags, video } = item
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
      {video && video.url && <br></br>}
      <ItemExcerpt {...props}></ItemExcerpt>
      {tags && tags.length > 0 && (
        <Styled.div
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
        </Styled.div>
      )}
      <ItemFooter {...props}></ItemFooter>
    </Box>
  )
}

export default Item
