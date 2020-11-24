/** @jsx jsx */
import { withPrefix } from "gatsby"
import { Box, jsx, Styled } from "theme-ui"
import Tag from "../item-tag"
import kebabCase from "lodash/kebabCase"
import Hero from "./item-hero"
import Video from "./video"
import { join as urlJoin } from "path"
import ItemHeader from "./item-header"
import ItemTitle from "./item-title"
import ItemExcerpt from "./item-excerpt"
import ItemFooter from "./item-footer"
const Item = ({ item, basePath }) => {
  const { title, isVideo, tags, video, videoHeight, videoWidth } = item

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
      <ItemHeader item={item}></ItemHeader>
      {title && <ItemTitle item={item}></ItemTitle>}
      <Hero item={item}></Hero>
      {video && (
        <Video
          isVideo={isVideo}
          src={video}
          height={videoHeight}
          width={videoWidth}
        ></Video>
      )}
      <ItemExcerpt item={item}></ItemExcerpt>
      {tags && tags.length > 0 && (
        <Styled.div
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
      <ItemFooter item={item}></ItemFooter>
    </Box>
  )
}

export default Item
