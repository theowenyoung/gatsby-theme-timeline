/** @jsx jsx */
import { jsx, Box, Flex, Text } from "theme-ui"
import processTweetString from "./process-tweet-string"
import UserInfo from "./user-info"
import TwitterButton from "./twitter-button"
import { Fragment } from "react"
import Hero from "./hero"
import RetweetedIcon from "./retweeted-icon"
import QuoteUserInfo from "./quote-user-info"
const Tweet = ({
  excerpt,
  authorName,
  authorScreenName,
  authorAvatar,
  image,
  idStr,
  imageAlt,
  retweeted,
  isQuoteStatus,
  quoteBody,
  quoteAuthorName,
  quoteAuthorScreenName,
  quoteAuthorAvatar,
  quoteImage,
}) => {
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
        ></UserInfo>
        <TwitterButton
          to={`https://twitter.com/${authorScreenName}/status/${idStr}`}
        ></TwitterButton>
      </Flex>

      <div>
        <Box sx={{ fontSize: 2, py: 2 }}>{body}</Box>
        <Hero post={{ image: image, imageAlt: imageAlt, excerpt }}></Hero>
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
              ></QuoteUserInfo>
              <Box sx={{ fontSize: 1, pt: 2 }}>{finalQuoteBody}</Box>
            </div>

            <Hero
              post={{
                image: quoteImage,
                imageAlt: `quote image`,
                excerpt: quoteBody,
              }}
            ></Hero>
          </div>
        )}
      </div>
    </Fragment>
  )
}
export default Tweet
