require("dotenv").config()
module.exports = {
  siteMetadata: {
    title: `Timeline`,
    author: "Owen Young",
    description: "Gatsby theme timeline",
    siteUrl: `https://gatsby-theme-timeline.netlify.app`,
    social: [
      {
        name: "Github",
        url: "https://github.com/theowenyoung/gatsby-theme-timeline",
        // external: true,
      },
      {
        name: "Twitter",
        url: "https://twitter.com/theowenyoung",
      },
    ],
    menuLinks: [
      { name: "Post", url: "/tags/post" },
      { name: "Reddit", url: "/tags/reddit/" },
      { name: "Twitter", url: "/tags/tweet/" },
    ],
  },
  plugins: [
    // {
    //   resolve: `gatsby-source-twitter`,
    //   options: {
    //     credentials: {
    //       consumer_key: process.env.TWITTER_CONSUMER_KEY,
    //       consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    //       access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    //       access_token_secret: process.env.TWITTER_ACCESS_SECRET,
    //     },
    //     queries: {
    //       MyTweet: {
    //         endpoint: "statuses/user_timeline",
    //         params: {
    //           screen_name: "TheOwenYoung",
    //           include_rts: true,
    //           tweet_mode: "extended",
    //         },
    //       },
    //     },
    //   },
    // },
    {
      resolve: `gatsby-theme-timeline`,
      options: {
        postsPerPage: 2,
        tweetTypeName: ["TweetsJson", "twitterStatusesUserTimelineMyTweet"],
        // disqus: {
        //   shortname: "gatsby-theme-timeline",
        // },
        utterances: {
          repo: "theowenyoung/gatsby-theme-timeline",
          label: "comment",
        },

        // shouldTransformImage: false,
        // basePath: "/test",
        // postsFilter: {
        //   tags: {
        //     in: ["tweet"],
        //   },
        // },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    // {
    //   resolve: "gatsby-plugin-robots-txt",
    //   options: {
    //     policy: [{ userAgent: "*", disallow: ["/"] }],
    //   },
    // },
  ],
}
