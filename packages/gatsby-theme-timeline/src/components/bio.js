/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link, withPrefix } from "gatsby"
import Image from "gatsby-image"
import { Styled, css, Flex, Link as LinkUI } from "theme-ui"
import BioContent from "./bio-content"

const Bio = ({ basePath }) => {
  basePath = basePath || `/`
  const data = useStaticQuery(bioQuery)
  const {
    site: {
      siteMetadata: { author },
    },
    avatar,
  } = data

  return (
    <Flex css={css({ mb: 3, alignItems: `center` })}>
      <LinkUI css={css({ pr: 2, pt: 2 })} as={Link} to={withPrefix(basePath)}>
        {avatar ? (
          <Image
            fixed={avatar.childImageSharp.fixed}
            alt={author}
            css={css({
              mb: 0,
              width: `48px`,
              minWidth: `48px`,
              borderRadius: `full`,
            })}
          />
        ) : (
          <div
            css={css({
              mb: 0,
              width: `48px`,
              minWidth: `48px`,
              borderRadius: `full`,
            })}
            role="presentation"
          />
        )}
      </LinkUI>

      <Styled.div>
        <BioContent />
      </Styled.div>
    </Flex>
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
      }
    }
    avatar: file(absolutePath: { regex: "/avatar.(jpeg|jpg|gif|png)/" }) {
      childImageSharp {
        fixed(width: 48, height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Bio
