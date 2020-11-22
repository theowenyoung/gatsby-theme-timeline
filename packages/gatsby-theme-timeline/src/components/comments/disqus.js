/** @jsx jsx */
import { DiscussionEmbed } from "disqus-react"
import { jsx, Styled } from "theme-ui"

const Disqus = ({ item, config }) => {
  const disqusConfig = {
    shortname: config.shortname,
    config: { identifier: item.slug, title: item.title },
  }
  return (
    <Styled.div sx={{ pt: 3 }}>
      <DiscussionEmbed {...disqusConfig} />
    </Styled.div>
  )
}
export default Disqus
