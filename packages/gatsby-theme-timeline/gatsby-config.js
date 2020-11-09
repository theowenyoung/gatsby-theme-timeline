const withDefaults = require(`./utils/default-options`)
module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions)

  return {
    plugins: [
      options.shouldTransformJson && {
        resolve: `gatsby-transformer-json`,
        options: options.jsonTransformerOptions,
      },
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
          ...themeOptions,
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-twitter`,
      `gatsby-plugin-reddit`,
      `gatsby-plugin-emotion`,
      {
        resolve: `gatsby-plugin-theme-ui`,
        options: {
          preset: options.preset, // Allow a user to use only local shadowing with no preset
          prismPreset: options.prismPreset,
        },
      },
    ],
  }
}
