import { useStaticQuery, graphql } from "gatsby"

const useTimelineThemeConfig = () => {
  const data = useStaticQuery(graphql`
    query {
      timelineThemeConfig(id: { eq: "gatsby-theme-timeline-config" }) {
        webfontURL
        basePath
      }
    }
  `)

  return data.timelineThemeConfig
}

export default useTimelineThemeConfig
