/** @jsx jsx */
import { withPrefix } from "gatsby"
import { Box, Link as LinkUI, jsx, Styled } from "theme-ui"
import Tag from "./tag"
import kebabCase from "lodash/kebabCase"
import Hero from "./hero"
import Video from "./video"
import { join as urlJoin } from "path"
import AuthorInfo from "./author-info"
import ItemTitle from "./item-title"
import ItemDate from "./item-date"
import ItemExcerpt from "./item-excerpt"

const Item = (post) => {
  const {
    title,
    isVideo,
    excerpt,
    tags,
    image,
    imageAlt,
    basePath,
    video,
    videoHeight,
    videoWidth,
    permalink,
    authorName,
    subreddit,
  } = post
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
      <AuthorInfo
        subreddit={subreddit}
        authorName={authorName}
        permalink={permalink}
      ></AuthorInfo>
      {title && <ItemTitle {...post}></ItemTitle>}
      <Hero post={{ image: image, imageAlt: imageAlt, excerpt }}></Hero>
      {video && (
        <Video
          isVideo={isVideo}
          src={video}
          height={videoHeight}
          width={videoWidth}
        ></Video>
      )}
      <ItemExcerpt {...post}></ItemExcerpt>

      <footer>
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
        <section>
          <ItemDate {...post}></ItemDate>
          <span sx={{ color: `textMuted` }}> · </span>
          <LinkUI
            href={`https://www.reddit.com${permalink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Reddit
          </LinkUI>
        </section>
      </footer>
    </Box>
  )
}

export default Item
