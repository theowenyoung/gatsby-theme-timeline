const withDefaults = require(`gatsby-theme-blog-core/utils/default-options`)
module.exports = (themeOptions) => {
  const baseOptions = withDefaults(themeOptions)
  const tweetTypeName = themeOptions.tweetTypeName || `TweetsJson`
  const postsPerPage = themeOptions.postsPerPage || 15
  const preset = themeOptions.preset || `gatsby-theme-ui-timeline-preset`
  const prismPreset = themeOptions.prismPreset || `github`
  const shouldTransformTweet = themeOptions.shouldTransformTweet || true
  const dataPath = themeOptions.dataPath || `data`
  const jsonTransformerOptions = {
    typeName: ({ node }) => {
      const rootDirectoryName = node.relativeDirectory.split(`/`)[0]
      const rootDirectoryNameCapitalized =
        rootDirectoryName.charAt(0).toUpperCase() + rootDirectoryName.slice(1)
      return `${rootDirectoryNameCapitalized}Json`
    },
  }
  return {
    tweetTypeName,
    postsPerPage,
    preset,
    prismPreset,
    dataPath,
    shouldTransformTweet,
    ...baseOptions,
    jsonTransformerOptions: {
      ...jsonTransformerOptions,
      ...themeOptions.jsonTransformerOptions,
    },
  }
}
