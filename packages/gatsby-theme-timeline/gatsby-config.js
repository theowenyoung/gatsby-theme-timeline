const withDefaults = require(`./utils/default-options`)
module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions)
  let plugins = []
  if (options.shouldTransformJson) {
    plugins.push({
      resolve: `gatsby-transformer-json`,
      options: options.jsonTransformerOptions,
    })
  }
  plugins = plugins.concat([
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: options.dataPath,
        name: options.dataPath,
      },
    },
    {
      resolve: `gatsby-theme-blog-core`,
      options: {
        imageMaxWidth: options.imageMaxWidth,
        limit: 1, // todo https://github.com/gatsbyjs/themes/pull/136 be merged
        ...themeOptions,
      },
    },
    {
      resolve: `gatsby-plugin-theme-ui`,
      options: {
        preset: options.preset, // Allow a user to use only local shadowing with no preset
        prismPreset: options.prismPreset,
      },
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: options.i18nConfig,
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-instagram`,
    `gatsby-plugin-reddit`,
    `gatsby-plugin-hn`,
    `gatsby-plugin-emotion`,
  ])
  return {
    plugins,
  }
}
