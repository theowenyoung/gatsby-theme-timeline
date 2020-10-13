module.exports = {
  plugins: [
    // with gatsby-plugin-theme-ui, the last theme in the config
    // will override the theme-ui context from other themes
    {
      resolve: `gatsby-theme-timeline`,
      options: {
        prismPreset: `prism-okaidia`,
      },
    },
  ],
  siteMetadata: {
    title: `Shadowed Site Title`,
    siteUrl: `https://www.example.com`,
  },
}
