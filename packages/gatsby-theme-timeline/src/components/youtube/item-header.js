/** @jsx jsx */
import { jsx, Flex, Link, Styled } from "theme-ui"
import Logo from "./logo"
import UpvoteIcon from "./upvote-icon"
import EyeIcon from "../icons/eye"
const SI_SYMBOL = [``, `k`, `M`, `G`, `T`, `P`, `E`]
function formatNumber(number) {
  // what tier? (determines SI symbol)
  const tier = (Math.log10(number) / 3) | 0

  // if zero, we don't need a suffix
  if (tier === 0) return number

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  // scale the number
  const scaled = number / scale

  // format number and add suffix
  return scaled.toFixed(1) + suffix
}
const AuthorInfo = ({ item }) => {
  const { authorName, authorUrl, score, url, views } = item
  if (!authorName) {
    return null
  }
  return (
    <Flex
      sx={{
        alignItems: `center`,
        fontSize: 0,
        pb: 2,
      }}
    >
      <Link
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mr: 2, mt: 2, flexShrink: 0 }}
        href={url}
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
        {`${authorName}`}
      </Link>

      <span sx={{ width: `8px` }}></span>

      <Styled.div as="span" sx={{ display: `inline-block`, flexShrink: 0 }}>
        <UpvoteIcon></UpvoteIcon>
      </Styled.div>
      <Styled.div
        as="span"
        sx={{ color: `textMuted`, display: `inline-block`, flexShrink: 0 }}
      >{`${formatNumber(score)}`}</Styled.div>
      <span
        sx={{
          color: `textMuted`,
          display: `inline-block`,
          mx: 1,
          flexShrink: 0,
        }}
      >
        ·
      </span>
      <Styled.div as="span" sx={{ display: `inline-block`, flexShrink: 0 }}>
        <EyeIcon></EyeIcon>
      </Styled.div>
      <Styled.div
        as="span"
        sx={{ color: `textMuted`, display: `inline-block`, flexShrink: 0 }}
      >{`${formatNumber(views)}`}</Styled.div>
    </Flex>
  )
}

export default AuthorInfo
