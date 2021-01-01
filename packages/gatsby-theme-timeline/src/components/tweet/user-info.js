/** @jsx jsx */
import { jsx, Flex, Box, Link, Text, Styled } from "theme-ui"
import Image from "gatsby-image"
import { css } from "theme-ui"
const UserInfo = ({ name, screenName, avatar, avatarRemote }) => {
  if (!name || !screenName) {
    return null
  }
  return (
    <Flex>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/${screenName}`}
      >
        {avatar?.childImageSharp ? (
          <Image
            fixed={avatar.childImageSharp.fixed}
            alt={`${name} avatar`}
            css={css({
              mr: 2,
              mb: 0,
              width: `48px`,
              minWidth: `48px`,
              borderRadius: `full`,
            })}
          />
        ) : (
          <Styled.img
            alt={`${name} avatar`}
            sx={{
              mr: 2,
              mb: 0,
              width: `48px`,
              minWidth: `48px`,
              borderRadius: `full`,
            }}
            src={avatarRemote}
          />
        )}
      </Link>
      <Link
        target="_blank"
        data-text="item-author"
        rel="noopener noreferrer"
        href={`https://twitter.com/${screenName}`}
      >
        <Box sx={{ fontWeight: `bold` }}>
          <Text itemprop="author" sx={{ color: `text` }}>
            {name}
          </Text>
        </Box>
        <Text
          sx={{
            color: `textMuted`,
            fontSize: 0,
          }}
        >
          @{screenName}
        </Text>
      </Link>
    </Flex>
  )
}

export default UserInfo
