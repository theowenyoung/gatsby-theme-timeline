/** @jsx jsx */

import { jsx, Styled } from "theme-ui"

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
          <Styled.a href={`https://www.reddit.com${permalink}`}>
            {title}
          </Styled.a>
          <br />
          from
          <Styled.a
            href={`http://www.reddit.com/r/${subreddit}`}
          >{` /r/${subreddit}`}</Styled.a>
        </blockquote>
      </Styled.div>
    </article>
  )
}

export default Detail
