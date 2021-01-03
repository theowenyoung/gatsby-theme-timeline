/** @jsx jsx */

import { jsx, Styled, Link as LinkUI } from "theme-ui"

const Detail = ({ item }) => {
  const { url, title, channel, channelUrl } = item
  return (
    <article>
      <Styled.div
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
      </Styled.div>
    </article>
  )
}

export default Detail
