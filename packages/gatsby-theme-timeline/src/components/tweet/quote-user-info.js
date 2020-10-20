/** @jsx jsx */
import { jsx, Flex, Box, Link, Text } from "theme-ui"
import Image from "gatsby-image"
import { css } from "theme-ui"
const UserInfo = ({ name, screenName, avatar }) => {
  if (!name || !screenName) {
    return null
  }
  return (
    <Flex sx={{ alignItems: `center` }}>
      <Link href={`https://twitter.com/${screenName}`}>
        {avatar?.childImageSharp && (
          <Image
            fixed={avatar.childImageSharp.fixed}
            alt={`${name} avatar`}
            css={css({
              mr: 2,
              mb: -2,
              width: `20px`,
              minWidth: `20px`,
              borderRadius: `full`,
            })}
          />
        )}
      </Link>
      <Link
        sx={{ display: `flex`, alignItems: `center` }}
        href={`https://twitter.com/${screenName}`}
      >
        <Box sx={{ fontWeight: `bold` }}>
          <Text sx={{ color: `text`, mr: 1 }}>{name}</Text>
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
