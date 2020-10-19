const withDefaults = require(`./utils/default-options`)

module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions)
  const {
    preset = `gatsby-theme-ui-timeline-preset`,
    prismPreset = `github`,
  } = options

  const {
    mdxOtherwiseConfigured = false,
    mdx: legacyConfigureMdxFlag = true,
  } = themeOptions // keep mdx flag so we don't introduce a breaking change

  return {
    siteMetadata: {
      title: `Blog Title Placeholder`,
      author: `Name Placeholder`,
      description: `Description placeholder`,
      siteUrl: `https://example.com`,
      links: [
        {
          name: `Twitter`,
          url: `https://twitter.com/TheOwenYoung`,
        },
        {
          name: `GitHub`,
          url: `https://github.com/theowenyoung`,
        },
      ],
    },
    plugins: [
      !mdxOtherwiseConfigured &&
        legacyConfigureMdxFlag && {
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
          path: options.contentPath || `content/posts`,
          name: options.contentPath || `content/posts`,
        },
      },
      {
        resolve: `gatsby-transformer-json`,
        options: options.jsonTransformerOptions,
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.dataPath || `data`,
          name: options.dataPath || `data`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.assetPath || `content/assets`,
          name: options.assetPath || `content/assets`,
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-emotion`,
      {
        resolve: `gatsby-plugin-theme-ui`,
        options: {
          preset: preset === false ? {} : preset, // Allow a user to use only local shadowing with no preset
          prismPreset: prismPreset,
        },
      },
    ].filter(Boolean),
  }
}
