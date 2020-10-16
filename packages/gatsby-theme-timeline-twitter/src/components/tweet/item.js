/** @jsx jsx */
import Twemoji from "react-twemoji"
import { jsx, Box, Flex, Link } from "theme-ui"
import processString from "react-process-string"
import UserInfo from "./user-info"
import TweetDate from "./date"
import TwitterButton from "./twitter-button"
import { TWEET_LINK_COLOR } from "./constans"
import ViewOnTwitter from "./view-on-twitter"
const TweetLinkColor = TWEET_LINK_COLOR
const Item = ({
  excerpt,
  authorName,
  authorId,
  authorAvatar,
  image,
  slug,
  date,
  idStr,
}) => {
  const body = processString([
    {
      regex: /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:(?:@|＠)(?!\/))([a-zA-Z0-9/_]{1,15})(?:\b(?!@|＠)|$)/,
      fn: (key, result) => {
        return (
          <Link
            sx={{ color: TweetLinkColor }}
            href={`https://twitter.com/${result[1]}`}
            key={key}
          >
            <span> @{result[1]}</span>
          </Link>
        )
      },
    },
    {
      regex: /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:#(?!\/))([a-zA-Z0-9/_]{1,280})(?:\b(?!#)|$)/,
      fn: (key, result) => {
        return (
          <Link
            sx={{ color: TweetLinkColor }}
            key={key}
            href={`https://twitter.com/hashtag/${result[1]}`}
          >
            <span> #{result[1]}</span>
          </Link>
        )
      },
    },
    {
      regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      fn: (key, result) => {
        return (
          <Link sx={{ color: TweetLinkColor }} key={key} href={`${result[0]}`}>
            <span> {result[0]}</span>
          </Link>
        )
      },
    },
    {
      regex: /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/,
      fn: (key, result) => {
        return (
          <Twemoji key={key} style={{ display: `inline` }}>
            {result[1]}
          </Twemoji>
        )
      },
    },
  ])(excerpt)

  return (
    <Box
      sx={{
        borderRadius: `default`,
        overflow: `hidden`,
        wordWrap: `break-word`,
        borderWidth: 1,
        borderStyle: `solid`,
        borderColor: `muted`,
        px: [3, 4],
        py: 4,
      }}
    >
      <Flex>
        <UserInfo
          name={authorName}
          screenName={authorId}
          avatar={authorAvatar}
        ></UserInfo>
        <TwitterButton
          to={`https://twitter.com/${authorId}/status/${idStr}`}
        ></TwitterButton>
      </Flex>

      <div>
        {typeof body !== `undefined` && body !== `` && (
          <Box sx={{ pb: 2 }}>{body}</Box>
        )}
        {typeof image !== `undefined` && image !== `` && (
          <div className="image-container">
            <img src={image} alt="" />
          </div>
        )}
        <footer>
          <TweetDate slug={slug} date={date}></TweetDate>
          <span sx={{ color: `textMuted` }}> · </span>
          <ViewOnTwitter
            href={`https://twitter.com/${authorId}/status/${idStr}`}
          ></ViewOnTwitter>
        </footer>
      </div>
    </Box>
  )
}
export default Item
