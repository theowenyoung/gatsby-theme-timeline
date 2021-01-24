/** @jsx jsx */
import { jsx, Flex, Link } from "theme-ui"
import Logo from "./logo"

const AuthorInfo = ({ item }) => {
  const { author, authorUrl, originalUrl } = item
  if (!author) {
    return null
  }
  return (
    <Flex
      sx={{
        alignItems: `center`,
        fontSize: 0,
      }}
    >
      <Link
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mr: 2, mt: 2, flexShrink: 0 }}
        href={originalUrl}
        data-test="author-image-container"
      >
        <Logo />
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: `textMuted`,
          overflow: `hidden`,
          textOverflow: `ellipsis`,
          whiteSpace: `nowrap`,
          display: `inline-block`,
        }}
        href={authorUrl}
      >
        {`${author}`}
      </Link>
    </Flex>
  )
}

export default AuthorInfo
