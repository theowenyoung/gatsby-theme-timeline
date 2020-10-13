exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type TimelineThemeConfig implements Node {
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
    id: `gatsby-theme-timeline-config`,
    parent: null,
    children: [],
    internal: {
      type: `TimelineThemeConfig`,
      contentDigest: createContentDigest(timelineThemeConfig),
      content: JSON.stringify(timelineThemeConfig),
      description: `Options for gatsby-theme-timeline`,
    },
  })
}
