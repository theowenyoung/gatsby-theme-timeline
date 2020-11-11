/** @jsx jsx */

import { jsx, Styled, Link as LinkUI } from "theme-ui"

const Detail = (post) => {
  const { permalink, title, subreddit } = post
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
          <LinkUI href={`https://www.reddit.com${permalink}`}>{title}</LinkUI>
          <br />
          from
          <LinkUI
            href={`http://www.reddit.com/r/${subreddit}`}
          >{` /r/${subreddit}`}</LinkUI>
        </blockquote>
      </Styled.div>
    </article>
  )
}

export default Detail
