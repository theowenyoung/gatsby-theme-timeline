const withDefaults = require(`gatsby-theme-blog-core/utils/default-options`)
const _ = require(`lodash`)
module.exports = (themeOptions) => {
  const baseOptions = withDefaults(themeOptions)
  const siteMetadata = themeOptions.siteMetadata || null
  const tweetTypeName = themeOptions.tweetTypeName || [`TweetsJson`]
  const redditTypeName = themeOptions.redditTypeName || [`RedditJson`]
  const hnTypeName = themeOptions.hnTypeName || [`HnJson`]
  const phTypeName = themeOptions.phTypeName || [`PhJson`]
  const redirectTypeName = themeOptions.redirectTypeName || [`RedirectJson`]
  const youtubeTypeName = themeOptions.youtubeTypeName || [`YoutubeJson`]
  const instagramTypeName = themeOptions.instagramTypeName || [`InstagramJson`]
  const postsPerPage = themeOptions.postsPerPage || 25
  const tagPostsPerPage = themeOptions.tagPostsPerPage || 25

  const preset = themeOptions.preset || `gatsby-theme-ui-timeline-preset`
  const prismPreset = themeOptions.prismPreset || `github`
  const shouldTransformJson =
    typeof themeOptions.shouldTransformJson === `undefined`
      ? true
      : themeOptions.shouldTransformJson
  const dataPath = themeOptions.dataPath || `data`
  const imageMaxWidth = themeOptions.imageMaxWidth || 1024
  const imageMaxHeight = themeOptions.imageMaxHeight || 512
  const postsFilter = themeOptions.postsFilter || {}
  const archiveTime =
    themeOptions.archiveTime || process.env.GATSBY_ARCHIVE_TIME
  const archiveEndTime =
    themeOptions.archiveEndTime || process.env.GATSBY_ARCHIVE_END_TIME
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
  const shouldTransformImage =
    typeof themeOptions.shouldTransformImage === `undefined`
      ? true
      : themeOptions.shouldTransformImage
  return {
    ...baseOptions,
    tweetTypeName,
    redditTypeName,
    hnTypeName,
    phTypeName,
    youtubeTypeName,
    instagramTypeName,
    redirectTypeName,
    postsPerPage,
    tagPostsPerPage,
    preset,
    prismPreset,
    dataPath,
    postsFilter,
    shouldTransformJson,
    shouldTransformImage,
    imageMaxWidth,
    imageMaxHeight,
    archiveTime,
    archiveEndTime,
    siteMetadata: siteMetadata,
    ...themeOptions,
    disqus: {
      ...disqusDefault,
      ...disqus,
    },
    utterances: {
      ...utterancesDefault,
      ...utterances,
    },
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
