const withDefaults = require(`gatsby-theme-blog-core/utils/default-options`)
const _ = require(`lodash`)
module.exports = (themeOptions) => {
  const baseOptions = withDefaults(themeOptions)
  const tweetTypeName = themeOptions.tweetTypeName || [`TweetsJson`]
  const postsPerPage = themeOptions.postsPerPage || 25
  const preset = themeOptions.preset || `gatsby-theme-ui-timeline-preset`
  const prismPreset = themeOptions.prismPreset || `github`
  const shouldTransformJson = themeOptions.shouldTransformJson || true
  const dataPath = themeOptions.dataPath || `data`
  const imageMaxWidth = themeOptions.imageMaxWidth || 1024
  const postsFilter = themeOptions.postsFilter || {}
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
    postsFilter,
    shouldTransformJson,
    imageMaxWidth,
    ...baseOptions,
    jsonTransformerOptions: {
      ...jsonTransformerOptions,
      ...themeOptions.jsonTransformerOptions,
    },
  }
}
