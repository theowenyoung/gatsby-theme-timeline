/** @jsx jsx */
import { css, Styled, jsx } from "theme-ui"
import { withPrefix } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Tag from "./tag"
import useTimelineThemeConfig from "../hooks/configOptions"
import { join as urlJoin } from "path"
import Disqus from "./comments/disqus"
import Utterances from "./comments/utterances"
import DetailFooterNav from "./detail-footer-nav"
import Bio from "./bio"
const PostFooter = (props) => {
  const { item, basePath } = props
  const timelineThemeConfig = useTimelineThemeConfig()
  const { tags } = item
  const { disqus, utterances } = timelineThemeConfig
  return (
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
      <Bio basePath={basePath}></Bio>
      <DetailFooterNav {...props}></DetailFooterNav>
      {disqus && disqus.shortname && (
        <Disqus config={disqus} item={item}></Disqus>
      )}
      {utterances && utterances.repo && (
        <Utterances config={utterances} item={item}></Utterances>
      )}
    </footer>
  )
}

export default PostFooter
