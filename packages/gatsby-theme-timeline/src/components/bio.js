/** @jsx jsx */
import { useStaticQuery, graphql, Link, withPrefix } from "gatsby"
import Image from "gatsby-image"
import { Styled, Flex, Link as LinkUI, jsx } from "theme-ui"
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
    <Flex sx={{ mb: 4, alignItems: `center` }}>
      <LinkUI
        sx={{ minWidth: `56px`, pr: 2, pt: 1 }}
        as={Link}
        to={withPrefix(basePath)}
      >
        {avatar ? (
          <Image
            fixed={avatar.childImageSharp.fixed}
            alt={author}
            sx={{
              mb: 0,
              width: `48px`,
              minWidth: `48px`,
              borderRadius: `full`,
            }}
          />
        ) : (
          <div
            sx={{
              mb: 0,
              width: `48px`,
              minWidth: `48px`,
              borderRadius: `full`,
            }}
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
