const withDefaults = require(`gatsby-theme-blog-core/utils/default-options`)
const _ = require(`lodash`)
module.exports = (themeOptions) => {
  const baseOptions = withDefaults(themeOptions)
  const tweetTypeName = themeOptions.tweetTypeName || [`TweetsJson`]
  const redditTypeName = themeOptions.redditTypeName || [`RedditJson`]
  const postsPerPage = themeOptions.postsPerPage || 25
  const preset = themeOptions.preset || `gatsby-theme-ui-timeline-preset`
  const prismPreset = themeOptions.prismPreset || `github`
  const shouldTransformJson = themeOptions.shouldTransformJson || true
  const dataPath = themeOptions.dataPath || `data`
  const imageMaxWidth = themeOptions.imageMaxWidth || 1024
  const imageMaxHeight = themeOptions.imageMaxHeight || 512
  const postsFilter = themeOptions.postsFilter || {}
  const jsonTransformerOptions = {
    typeName: ({ node }) => {
      const rootDirectoryName = node.relativeDirectory.split(`/`)[0]
      return _.upperFirst(_.camelCase(`${rootDirectoryName} Json`))
    },
  }
  const i18nConfig = themeOptions.i18nConfig || {
    defaultLang: `en`,
    configPath: require.resolve(`../i18n/config.json`),
  }
  const disqusDefault = { shortname: `` }
  const disqus = themeOptions.disqus || {}
  const utterancesDefault = { repo: `` }
  const utterances = themeOptions.utterances || {}
  return {
    disqus: {
      ...disqusDefault,
      ...disqus,
    },
    utterances: {
      ...utterancesDefault,
      ...utterances,
    },
    tweetTypeName,
    redditTypeName,
    postsPerPage,
    preset,
    prismPreset,
    dataPath,
    postsFilter,
    shouldTransformJson,
    imageMaxWidth,
    imageMaxHeight,
    ...baseOptions,
    jsonTransformerOptions: {
      ...jsonTransformerOptions,
      ...themeOptions.jsonTransformerOptions,
    },
    i18nConfig: {
      ...i18nConfig,
      ...themeOptions.i18nConfig,
    },
  }
}
