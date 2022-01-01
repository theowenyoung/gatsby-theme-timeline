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
  plugins = plugins.concat(
    [
      !options.mdxOtherwiseConfigured && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: options.imageMaxWidth,
                linkImagesToOriginal: false,
              },
            },
            { resolve: `gatsby-remark-copy-linked-files` },
            { resolve: `gatsby-remark-smartypants` },
          ],
          remarkPlugins: [require(`remark-slug`)],
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.dataPath,
          name: options.dataPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.contentPath || `content/posts`,
          name: options.contentPath || `content/posts`,
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
      `gatsby-plugin-hn`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-image`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
    ].filter(Boolean)
  )
  return {
    plugins,
  }
}
