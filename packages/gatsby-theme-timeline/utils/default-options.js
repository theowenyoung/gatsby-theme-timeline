const _ = require(`lodash`)
module.exports = (themeOptions) => {
  const basePath = themeOptions.basePath || `/`
  const contentPath = themeOptions.contentPath || `content/posts`
  const assetPath = themeOptions.assetPath || `content/assets`
  const excerptLength = themeOptions.excerptLength || 140
  const filter = themeOptions.filter || {}
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
  const maxPosts =
    themeOptions.maxPosts !== undefined ? themeOptions.maxPosts : 1000
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
  const postStartTime =
    themeOptions.postStartTime || process.env.GATSBY_POST_START_TIME
  const postEndTime =
    themeOptions.postEndTime || process.env.GATSBY_POST_END_TIME
  let skipCreateIndexPages = false

  if (process.env.GATSBY_SKIP_CREATE_INDEX_PAGES === `true`) {
    skipCreateIndexPages = true
  }
  if (themeOptions.skipCreateIndexPages) {
    skipCreateIndexPages = true
  }

  let skipCreateTagPages = false

  if (process.env.GATSBY_SKIP_CREATE_TAG_PAGES === `true`) {
    skipCreateTagPages = true
  }
  if (themeOptions.skipCreateTagPages) {
    skipCreateTagPages = true
  }

  let skipCreateDetailPages = false

  if (process.env.GATSBY_SKIP_CREATE_DETAIL_PAGES === `true`) {
    skipCreateDetailPages = true
  }
  if (themeOptions.skipCreateDetailPages) {
    skipCreateDetailPages = true
  }
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
    basePath,
    contentPath,
    assetPath,
    filter,
    tweetTypeName,
    redditTypeName,
    hnTypeName,
    phTypeName,
    youtubeTypeName,
    instagramTypeName,
    redirectTypeName,
    postsPerPage,
    excerptLength,
    tagPostsPerPage,
    preset,
    prismPreset,
    dataPath,
    postsFilter,
    shouldTransformJson,
    shouldTransformImage,
    imageMaxWidth,
    imageMaxHeight,
    postStartTime,
    postEndTime,
    skipCreateIndexPages,
    skipCreateDetailPages,
    skipCreateTagPages,
    maxPosts,
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
