/** @jsx jsx */
import { DiscussionEmbed } from "disqus-react"
import { jsx, Themed } from "theme-ui"

const Disqus = ({ item, config }) => {
  const disqusConfig = {
    shortname: config.shortname,
    config: { identifier: item.slug, title: item.title },
  }
  return (
    <Themed.div sx={{ pt: 3 }}>
      <DiscussionEmbed {...disqusConfig} />
    </Themed.div>
  )
}
export default Disqus
