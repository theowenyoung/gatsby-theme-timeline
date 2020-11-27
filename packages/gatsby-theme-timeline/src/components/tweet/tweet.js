/** @jsx jsx */
import { jsx, Box, Flex, Text } from "theme-ui"
import processTweetString from "./process-tweet-string"
import UserInfo from "./user-info"
import TwitterButton from "./twitter-button"
import { Fragment } from "react"
import Hero from "./item-hero"
import RetweetedIcon from "./retweeted-icon"
import QuoteUserInfo from "./quote-user-info"
const Tweet = ({ item }) => {
  const {
    excerpt,
    authorName,
    authorScreenName,
    authorAvatar,
    authorAvatarRemote,
    idStr,
    retweeted,
    isQuoteStatus,
    quoteBody,
    quoteAuthorName,
    quoteAuthorScreenName,
    quoteAuthorAvatar,
    quoteAuthorAvatarRemote,
    quoteImage,
    quoteImageRemote,
  } = item
  const body = processTweetString(excerpt)
  let finalQuoteBody = ``
  if (isQuoteStatus) {
    finalQuoteBody = processTweetString(quoteBody)
  }
  return (
    <Fragment>
      {retweeted && (
        <Flex
          sx={{ color: `textMuted`, mb: 1, fontSize: 0, alignItems: `center` }}
        >
          <Flex
            sx={{
              mr: 2,
              mb: -1,
              width: `48px`,
              justifyContent: `flex-end`,
            }}
          >
            <RetweetedIcon></RetweetedIcon>
          </Flex>
          <Text>Retweeted</Text>
        </Flex>
      )}
      <Flex>
        <UserInfo
          name={authorName}
          screenName={authorScreenName}
          avatar={authorAvatar}
          avatarRemote={authorAvatarRemote}
        ></UserInfo>
        <TwitterButton
          to={`https://twitter.com/${authorScreenName}/status/${idStr}`}
        ></TwitterButton>
      </Flex>

      <div>
        <Box sx={{ fontSize: 1, py: 2, whiteSpace: `pre-line` }}>{body}</Box>
        <Hero item={item}></Hero>
        {isQuoteStatus && (
          <div
            sx={{
              borderRadius: `default`,
              overflow: `hidden`,
              wordWrap: `break-word`,
              borderWidth: 1,
              borderStyle: `solid`,
              borderColor: `muted`,
              mb: 2,
            }}
          >
            <div sx={{ p: 3 }}>
              <QuoteUserInfo
                name={quoteAuthorName}
                screenName={quoteAuthorScreenName}
                avatar={quoteAuthorAvatar}
                avatarRemote={quoteAuthorAvatarRemote}
              ></QuoteUserInfo>
              <Box sx={{ fontSize: 1, pt: 2 }}>{finalQuoteBody}</Box>
            </div>

            <Hero
              item={{
                image: quoteImage,
                imageAlt: `quote image`,
                excerpt: quoteBody,
                imageRemote: quoteImageRemote,
              }}
            ></Hero>
          </div>
        )}
      </div>
    </Fragment>
  )
}
export default Tweet
