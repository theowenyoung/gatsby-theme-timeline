module.exports = {
  siteMetadata: {
    title: `Shadowed Site Title`,
    siteUrl: `https://gatsby-starter-timeline.surge.sh`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-timeline`,
      options: {
        postsPerPage: 5,
        basePath: "/test",
        postsFilter: {
          tags: {
            in: ["tweet"],
          },
        },
      },
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
