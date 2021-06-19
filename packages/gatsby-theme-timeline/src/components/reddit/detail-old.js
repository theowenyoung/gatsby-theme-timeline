/** @jsx jsx */

import { jsx, Themed, Link as LinkUI } from "theme-ui"

const Detail = ({ item }) => {
  const { url, title, channel, channelUrl } = item
  return (
    <article>
      <Themed.div
        sx={{
          "& > blockquote": (theme) => theme.styles.blockquote,
          "& > div > div": {
            margin: `0 !important`,
          },
        }}
      >
        <blockquote className="reddit-card">
          <LinkUI href={url}>{title}</LinkUI>
          <br />
          from
          <LinkUI href={channelUrl}>{` /r/${channel}`}</LinkUI>
        </blockquote>
      </Themed.div>
    </article>
  )
}

export default Detail
