/** @jsx jsx */
import Twemoji from "react-twemoji"
import { jsx, Box, Flex, Link } from "theme-ui"
import processString from "react-process-string"
import UserInfo from "./user-info"
import TwitterButton from "./twitter-button"
import { TWEET_LINK_COLOR } from "./constans"
import { Fragment } from "react"
import Hero from "./hero"
const TweetLinkColor = TWEET_LINK_COLOR
const Tweet = ({
  excerpt,
  authorName,
  authorId,
  authorAvatar,
  image,
  idStr,
  imageAlt,
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
    <Fragment>
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
          <Box sx={{ fontSize: 2, py: 2 }}>{body}</Box>
        )}
        <Hero post={{ image: image, imageAlt: imageAlt, excerpt }}></Hero>
      </div>
    </Fragment>
  )
}
export default Tweet
