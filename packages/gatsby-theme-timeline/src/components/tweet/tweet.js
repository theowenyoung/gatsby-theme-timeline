/** @jsx jsx */
import { jsx, Flex, Text } from "theme-ui"
import UserInfo from "./user-info"
import TwitterButton from "./twitter-button"
import { Fragment } from "react"
import Hero from "./item-hero"
import RetweetedIcon from "./retweeted-icon"
import QuoteUserInfo from "./quote-user-info"
import ItemTitle from "./item-title"
import QuoteTitle from "./quote-title"

const Tweet = (props) => {
  const { item } = props
  const {
    author,
    authorSlug,
    authorImage,
    authorImageRemote,
    sharedContent,
    title,
    url,
  } = item

  const retweeted = sharedContent && title.startsWith(`RT @`)
  const isQuoteStatus = sharedContent && !retweeted
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
          name={author}
          screenName={authorSlug}
          avatar={authorImage}
          avatarRemote={authorImageRemote}
        ></UserInfo>
        <TwitterButton to={url}></TwitterButton>
      </Flex>

      <div>
        <ItemTitle {...props}></ItemTitle>
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
                name={sharedContent.author}
                screenName={sharedContent.authorSlug}
                avatar={sharedContent.authorImage}
                avatarRemote={sharedContent.authorImageRemote}
              ></QuoteUserInfo>
              <QuoteTitle {...props}></QuoteTitle>
            </div>
            <Hero
              item={{
                image: sharedContent.image,
                imageAlt: `quote image`,
                excerpt: sharedContent.title,
                imageRemote: sharedContent.imageRemote,
              }}
            ></Hero>
          </div>
        )}
      </div>
    </Fragment>
  )
}
export default Tweet
