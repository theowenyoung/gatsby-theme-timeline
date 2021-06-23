/** @jsx jsx */
import { useStaticQuery, graphql, Link, withPrefix } from "gatsby"
import { Themed, Flex, Link as LinkUI, jsx, Image } from "theme-ui"
import BioContent from "./bio-content"

const Bio = ({ basePath, siteMetadata }) => {
  basePath = basePath || `/`
  if (!siteMetadata) {
    const data = useStaticQuery(bioQuery)
    siteMetadata = data.site.siteMetadata
  }

  return (
    <Flex data-test="bio" sx={{ mb: 4, alignItems: `center` }}>
      <LinkUI
        sx={{ minWidth: `56px`, pr: 2, pt: 1 }}
        as={Link}
        to={withPrefix(basePath)}
      >
        {siteMetadata.iconUrl ? (
          <Image
            src={siteMetadata.iconUrl}
            alt="logo"
            sx={{
              mb: 0,
              borderRadius: `full`,
              width: `48px`,
              height: `48px`,
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
        iconUrl
      }
    }
  }
`

export default Bio
