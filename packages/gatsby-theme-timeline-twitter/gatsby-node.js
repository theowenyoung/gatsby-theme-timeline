exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type TimelineTwitterThemeConfig implements Node {
      webfontURL: String,
    }
  `)
}

exports.sourceNodes = (
  { actions, createContentDigest },
  { webfontURL = `` }
) => {
  const { createNode } = actions

  const timelineThemeConfig = {
    webfontURL,
  }

  createNode({
    ...timelineThemeConfig,
    id: `gatsby-theme-timeline-twitter-config`,
    parent: null,
    children: [],
    internal: {
      type: `TimelineTwitterThemeConfig`,
      contentDigest: createContentDigest(timelineThemeConfig),
      content: JSON.stringify(timelineThemeConfig),
      description: `Options for gatsby-theme-timeline-twitter`,
    },
  })
}
