require("dotenv").config()
const siteMetadata = {
  title: `Timeline`,
  author: "Owen Young",
  description: "Gatsby theme timeline",
  keywords: ["timeline", "gatsby"],
  siteUrl: `https://gatsby-theme-timeline.owenyoung.com`,
  telegram: "test",
  iconUrl: "https://i.imgur.com/jVsw5Oq.png",
  defaultSocialImageUrl: "https://i.imgur.com/LI3xVu0.png",
  social: [
    {
      name: "Github",
      url: "https://github.com/theowenyoung/gatsby-theme-timeline",
      external: true,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/theowenyoung",
    },
  ],
  menuLinks: [
    { name: "Post", url: "/tags/post" },
    { name: "Reddit", url: "/tags/reddit/", external: true },
    { name: "Twitter", url: "/tags/tweet/", prefetch: false },
  ],
  // disqus: {
  //   shortname: "gatsby-theme-timeline",
  // },
  utterances: {
    repo: "theowenyoung/gatsby-theme-timeline",
    label: "comment",
  },
}
module.exports = {
  siteMetadata,
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
    // {
    //   resolve: `@theowenyoung/gatsby-source-instagram`,
    //   options: {
    //     access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
    //     paginate: 100,
    //     maxPosts: 1000,
    //   },
    // },

    {
      resolve: `gatsby-theme-timeline`,
      options: {
        // postsPerPage: 2,
        tweetTypeName: ["TweetsJson", "twitterStatusesUserTimelineMyTweet"],
        instagramTypeName: ["InstagramJson", "InstaNode"],
        // archiveTime: "2021/06/17",

        siteMetadata,
        shouldTransformImage: false,
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
