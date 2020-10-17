module.exports = {
  siteMetadata: {
    title: `Shadowed Site Title`,
    siteUrl: `https://gatsby-starter-timeline.surge.sh`,
  },
  plugins: [
    // with gatsby-plugin-theme-ui, the last theme in the config
    // will override the theme-ui context from other themes
    {
      resolve: `gatsby-theme-timeline-core`,
      options: {},
    },
    {
      resolve: `gatsby-theme-timeline`,
    },
    {
      resolve: `gatsby-theme-timeline-twitter`,
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", disallow: ["/"] }],
      },
    },
  ],
}
