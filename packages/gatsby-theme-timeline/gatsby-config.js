module.exports = (options) => {
  return {
    plugins: [
      {
        resolve: `gatsby-theme-timeline-core`,
        options,
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-twitter`,
      `gatsby-plugin-emotion`,
    ],
  }
}
