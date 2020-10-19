/** @jsx jsx */
import { jsx, Flex, Box, Link, Text } from "theme-ui"
import Twemoji from "react-twemoji"
import Image from "gatsby-image"
import { css } from "theme-ui"
const UserInfo = ({ name, screenName, avatar }) => {
  if (!name || !screenName) {
    return null
  }
  return (
    <Flex>
      <Link href={`https://twitter.com/${screenName}`}>
        {avatar?.childImageSharp && (
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
        )}
      </Link>
      <Link href={`https://twitter.com/${screenName}`}>
        <Box sx={{ fontWeight: `bold` }}>
          <Twemoji>
            <Text sx={{ color: `text` }}>{name}</Text>
          </Twemoji>
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
