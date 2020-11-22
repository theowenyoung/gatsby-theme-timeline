import { useStaticQuery, graphql } from "gatsby"

const useTimelineThemeConfig = () => {
  const data = useStaticQuery(graphql`
    query {
      timelineThemeConfig(id: { eq: "gatsby-theme-timeline-config" }) {
        webfontURL
        disqus {
          shortname
        }
        utterances {
          repo
          theme
          label
          issueTerm
        }
      }
    }
  `)

  return data.timelineThemeConfig
}

export default useTimelineThemeConfig
