/** @jsx jsx */
import { jsx, Flex, Link, Styled } from "theme-ui"
import Logo from "./logo"
const AuthorInfo = ({ subreddit, authorName, permalink, score }) => {
  if (!subreddit || !authorName) {
    return null
  }
  return (
    <Flex sx={{ alignItems: `center`, fontSize: 0 }}>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mr: 2, mt: 2 }}
        href={`https://www.reddit.com${permalink}`}
      >
        <Logo />
      </Link>
      <Flex sx={{ alignItems: `center` }}>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: `text` }}
          href={`https://www.reddit.com/r/${subreddit}`}
        >
          {`r/${subreddit}`}
        </Link>
        <span
          sx={{
            mx: 1,
            color: `textMuted`,
            fontSize: 4,
            mt: -1,
            fontWidth: `bold`,
          }}
        >
          ·
        </span>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: `textMuted` }}
          href={`https://www.reddit.com/u/${authorName}`}
        >
          {`${authorName}`}
        </Link>
        <span
          sx={{
            mx: 1,
            color: `textMuted`,
            fontSize: 4,
            mt: -1,
            fontWidth: `bold`,
          }}
        >
          ·
        </span>
        <Styled.div
          as="span"
          sx={{ color: `textMuted` }}
        >{`${score} points`}</Styled.div>
      </Flex>
    </Flex>
  )
}

export default AuthorInfo
