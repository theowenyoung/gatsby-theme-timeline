/** @jsx jsx */
import { jsx, Flex, Text } from "theme-ui"
import UserInfo from "./user-info"
import TwitterButton from "./twitter-button"
import { Fragment } from "react"
import Hero from "./item-hero"
import RetweetedIcon from "./retweeted-icon"
import QuoteUserInfo from "./quote-user-info"
import ItemExcerpt from "./item-excerpt"
import QuoteExcerpt from "./quote-excerpt"

const Tweet = (props) => {
  const { item } = props
  const {
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
        <ItemExcerpt {...props}></ItemExcerpt>
        <Hero item={item}></Hero>
        {isQuoteStatus && (
          <div
            itemType="https://schema.org/Quotation"
            itemScope
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
              <QuoteExcerpt {...props}></QuoteExcerpt>
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
