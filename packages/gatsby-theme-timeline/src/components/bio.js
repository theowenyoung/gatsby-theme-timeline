/** @jsx jsx */
import { useStaticQuery, graphql, Link, withPrefix } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Themed, Flex, Link as LinkUI, jsx } from "theme-ui"
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
    <Flex data-test="bio" sx={{ mb: 4, alignItems: `center` }}>
      <LinkUI
        sx={{ minWidth: `56px`, pr: 2, pt: 1 }}
        as={Link}
        to={withPrefix(basePath)}
      >
        {avatar ? (
          <GatsbyImage
            image={getImage(avatar)}
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

      <Themed.div>
        <BioContent />
      </Themed.div>
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
        gatsbyImageData(layout: FIXED, width: 48, height: 48)
      }
    }
  }
`

export default Bio
