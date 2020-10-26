const withDefaults = require(`gatsby-theme-blog-core/utils/default-options`)
const _ = require(`lodash`)
module.exports = (themeOptions) => {
  const baseOptions = withDefaults(themeOptions)
  const tweetTypeName = themeOptions.tweetTypeName || `TweetsJson`
  const postsPerPage = themeOptions.postsPerPage || 15
  const preset = themeOptions.preset || `gatsby-theme-ui-timeline-preset`
  const prismPreset = themeOptions.prismPreset || `github`
  const shouldTransformTweet = themeOptions.shouldTransformTweet || true
  const dataPath = themeOptions.dataPath || `data`
  const timelineMdxOtherwiseConfigured = themeOptions.dataPath || false
  const imageMaxWidth = themeOptions.imageMaxWidth || 1024
  const jsonTransformerOptions = {
    typeName: ({ node }) => {
      const rootDirectoryName = node.relativeDirectory.split(`/`)[0]
      return _.upperFirst(_.camelCase(`${rootDirectoryName} Json`))
    },
  }
  return {
    tweetTypeName,
    postsPerPage,
    preset,
    prismPreset,
    dataPath,
    shouldTransformTweet,
    timelineMdxOtherwiseConfigured,
    imageMaxWidth,
    ...baseOptions,
    jsonTransformerOptions: {
      ...jsonTransformerOptions,
      ...themeOptions.jsonTransformerOptions,
    },
  }
}
