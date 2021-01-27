<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>

<h1 align="center">
  Gatsby Timeline Theme
</h1>

A Gatsby theme for creating a blog.

[Live Demo](https://gatsby-theme-timeline.owenyoung.com/)

![Screen](https://i.imgur.com/6yITI4E.png)

## Features

- Support Mdx, tweet, instagram medias, youtube videos, hacker news, reddit post
- Support i18n by [gatsby-theme-i18n](https://www.gatsbyjs.com/plugins/gatsby-theme-i18n/), you can choose your own [i18n library](https://github.com/gatsbyjs/themes/tree/master/packages)
- Support comments [disqus](https://disqus.com/) or [utterances](https://utteranc.es/)
- Support Tags
- Pagination, even tag page supports pagination
- SEO Optimization

## Installation

### For a new site

If you're creating a new site and want to use the timeline theme, you can use the timeline theme starter. This will generate a new site that pre-configures use of the timeline theme.

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the timeline blog theme starter.

    ```shell
    # create a new Gatsby site using the timeline blog theme starter
    gatsby new my-themed-blog https://github.com/theowenyoung/gatsby-starter-timeline
    ```

1.  **Create twitter credentials**

    Optional, if you want to add your tweets to blog, create `.env` with the following content:

    ```ini
    TWITTER_CONSUMER_KEY=xx
    TWITTER_CONSUMER_SECRET=xx
    TWITTER_ACCESS_TOKEN=xx
    TWITTER_ACCESS_SECRET=xx
    ```

    Then, uncomment `gatsby-config.js` plugin `gatsby-source-twitter`

1.  **Create instagram credentials**

    Optional, if you want to add your instagram to blog, create `.env` with the following content:

    ```ini
    INSTAGRAM_ACCESS_TOKEN=xx
    ```

    > See [How to get instagram access token](https://github.com/nbcommunication/InstagramBasicDisplayApi#creating-a-facebook-app)

    > Then, uncomment `gatsby-config.js` plugin `gatsby-source-instagram`

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-themed-blog/
    gatsby develop
    ```

1.  **Open the code and start customizing!**

    Your site is now running at `http://localhost:8000`!

### For an existing site

If you already have a site you'd like to add the timeline theme to, you can manually configure it.

1. Install the timeline theme

```shell
npm install gatsby-theme-timeline theme-ui
```

1. Add the configuration to your `gatsby-config.js` file

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-timeline`,
      options: {
        // basePath defaults to `/`
        basePath: `/blog`,
      },
    },
  ],
}
```

1. Add blog posts to your site by creating `md` or `mdx` files inside `/content/posts`.

   > Note that if you've changed the default `contentPath` in the configuration, you'll want to add your markdown files in the directory specified by that path.

1. Optional, Add tweets to your site, there are 2 ways for adding tweets:

   1. By creating `.json` files inside `/data/tweets`, you can use [Actionsflow](https://github.com/actionsflow/actionsflow) to auto sync your tweets, for example [my blog](https://blog.owenyoung.com), [source](https://github.com/theowenyoung/story), [site source](https://github.com/theowenyoung/theowenyoung.github.io)

   1. By using [`gatsby-source-twitter`](https://www.gatsbyjs.com/plugins/gatsby-source-twitter/), for example:

   ```javascript
   {
     plugins: [
       {
         resolve: `gatsby-source-twitter`,
         options: {
           credentials: {
             consumer_key: process.env.TWITTER_CONSUMER_KEY,
             consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
             access_token_key: process.env.TWITTER_ACCESS_TOKEN,
             access_token_secret: process.env.TWITTER_ACCESS_SECRET,
           },
           queries: {
             MyTweet: {
               endpoint: "statuses/user_timeline",
               params: {
                 screen_name: "TheOwenYoung",
                 include_rts: true,
                 tweet_mode: "extended",
               },
             },
           },
         },
       },
       {
         resolve: `gatsby-theme-timeline`,
         options: {
           tweetTypeName: ["TweetsJson", "twitterStatusesUserTimelineMyTweet"],
         },
       },
     ]
   }
   ```

1. Optional, add instagram posts to your site, there are 2 ways for adding tweets:

   1. By creating `.json` files inside `/data/instagram`, you can use [Actionsflow](https://github.com/actionsflow/actionsflow) to auto sync your instagram posts, for example [my blog](https://blog.owenyoung.com), [source](https://github.com/theowenyoung/story), [site source](https://github.com/theowenyoung/theowenyoung.github.io)

   1. By using [`@theowenyoung/gatsby-source-instagram`](https://github.com/theowenyoung/gatsby-source-instagram), for example:

   ```javascript
   {
      resolve: `@theowenyoung/gatsby-source-instagram`,
      options: {
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
        paginate: 100,
        maxPosts: 1000,
      },
    },
   ```

   > See [How to get instagram access token](https://github.com/nbcommunication/InstagramBasicDisplayApi#creating-a-facebook-app)

1. Add an image with the file name `avatar` (can be jpg or png) inside the `/assets` directory to include a small image next to the footer on every post page.

> Note that if you've changed the default `assetPath` in the configuration, you'll want to add your asset files in the directory specified by that path.

1. Run your site using `gatsby develop` and navigate to your blog posts. If you used the above configuration, your URL will be `http://localhost:8000/blog`

## Usage

### Theme options

| Key                      | Default value                                              | Description                                                                                                                                                                                                                       |
| ------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`               | `/`                                                        | Root url for all blog posts                                                                                                                                                                                                       |
| `contentPath`            | `content/posts`                                            | Location of blog posts                                                                                                                                                                                                            |
| `dataPath`               | `data/tweets`                                              | Location of tweets                                                                                                                                                                                                                |
| `assetPath`              | `content/assets`                                           | Location of assets                                                                                                                                                                                                                |
| `tweetTypeName`          | `['TweetsJson']`                                           | Tweet type name ,`string[]` or `string`                                                                                                                                                                                           |
| `instagramTypeName`      | `['InstagramJson']`                                        | Instagram type name ,`string[]` or `string`                                                                                                                                                                                       |
| `postsPerPage`           | `25`                                                       | size per page                                                                                                                                                                                                                     |
| `mdxOtherwiseConfigured` | `false`                                                    | Set this flag `true` if `gatsby-plugin-mdx` is already configured for your site.                                                                                                                                                  |
| `preset`                 | `gatsby-theme-ui-preset`                                   | Theme UI compatible package name that will act as the base styles for your project. Be sure to install the package you're referencing. Set to `false` to ignore all presets and only use local styles.                            |
| `prismPreset`            | `null`                                                     | Theme UI compatible package name that will act as the prism syntax highlighting for your project. Be sure to install the package you're referencing. For themes in `@theme-ui/prism` the name will suffice, e.g. `prism-okaidia`. |
| `excerptLength`          | `140`                                                      | Length of the auto-generated excerpt of a blog post                                                                                                                                                                               |
| `webfontURL`             | `''`                                                       | URL for the webfont you'd like to include. Be sure that your local theme does not override it.                                                                                                                                    |
| `imageMaxWidth`          | `1024`                                                     | Set the max width of images in your blog posts. This applies to your featured image in frontmatter as well.                                                                                                                       |
| `i18nConfig`             | `{defaultLang: 'en',configPath: './i18n/config.json')}`    | i18n config, this will forward to [gatsby-theme-i18n](https://github.com/gatsbyjs/themes/tree/master/packages/gatsby-theme-i18n)                                                                                                  |
|                          |
| `disqus`                 | `{shortname: '')}`                                         | Get it by <https://disqus.com/>                                                                                                                                                                                                   |
|                          |
| `utterances`             | `{repo: '')}`                                              | `{repo:"your-repo","theme":"github-light","issueTerm":"pathname","label":""}`, more information see <https://utteranc.es/>                                                                                                        |
|                          |
| `shouldTransformerImage` | `true`                                                     | should transformer image of tweet, reddit                                                                                                                                                                                         |
|                          |
| `shouldTransformerJson`  | `true`                                                     | should transformer json files, for including the tweet json, reddit json                                                                                                                                                          |
|                          |
| `jsonTransformerOptions` | see [`utils/default-options.js`](utils/default-options.js) | if `shouldTransformerJson` is `true`, then, you can set the options of [gatsby-transformer-json](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-json)                                                 |
|                          |

More options see [`utils/default-options.js`](utils/default-options.js)

#### Example configuration

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-timeline`,
      options: {
        // basePath defaults to `/`
        basePath: `/blog`,
        prismPreset: `prism-okaidia`,
      },
    },
  ],
}
```

### Additional configuration

In addition to the theme options, there are a handful of items you can customize via the `siteMetadata` object in your site's `gatsby-config.js`

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    // Used for the site title and SEO
    title: `My Blog Title`,
    // Used to provide alt text for your avatar
    author: `My Name`,
    // Used for SEO
    description: `My site description...`,
    // Used for resolving images in social cards
    siteUrl: `https://example.com`,
    // Used for links in the root aside
    menuLinks: [
      {
        name: `Twitter`,
        url: `https://twitter.com/TheOwenYoung`,
        external: true,
      },
      {
        name: `GitHub`,
        url: `https://github.com/theowenyoung`,
      },
    ],
    social: [
      {
        name: `Twitter`,
        url: `https://twitter.com/TheOwenYoung`,
        external: true,
      },
      {
        name: `GitHub`,
        url: `https://github.com/theowenyoung`,
      },
    ],
  },
}
```

### Blog Post Fields

The following are the defined blog post fields based on the node interface in the schema

| Field       | Type     |
| ----------- | -------- |
| id          | String   |
| title       | String   |
| body        | String   |
| slug        | String   |
| date        | Date     |
| tags        | String[] |
| excerpt     | String   |
| image       | String   |
| imageAlt    | String   |
| socialImage | String   |

### Image Behavior

Blog posts can include references to images inside frontmatter. Note that this works for a relative path as shown below, or an external URL.

```md
---
title: Hello World (example)
date: 2019-04-15
image: ./some-image.jpg
---
```

`image` refers to the featured image at the top of a post and is not required. It will also appear as the preview image inside a social card. Note that this requires you to set `siteUrl` in your `gatsby-config.js` file metadata to your site's domain.

When adding an `image`, `imageAlt` is available to provide alt text for the featured image within the post. If this is not included, it defaults to the post excerpt.

You may want to use a different image for social sharing than the one that appears in your blog post. You can do so by setting `socialImage` in frontmatter.

### How Styles work

This theme enables `gatsby-plugin-theme-ui` which allows you to leverage [Theme UI](https://theme-ui.com/) to style your project.

By default, `gatsby-theme-ui-timeline-preset` operates as your base theme styles. Any local shadowed styles deep merge with that preset.

Alternatively, you can pass a preset of your own choosing by installing the package and passing the package name as the `preset` in `gatsby-config.js`. Again, local shadowed styles will deep merge with this preset if they exist.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-timeline`,
      options: {
        preset: `my-preset-name-here`,
      },
    },
  ],
}
```

If you'd rather use only local shadowed styles with no underlying preset, pass the `preset` option as `false`.

#### Prism

You can also configure your prism theme for syntax highlighting in code snippets by passing the `prismPreset` option.

`@theme-ui/prism` is included by default, so any [available presets](https://theme-ui.com/packages/prism#syntax-themes) can be passed using only their name, e.g. `dracula`. The default value is `github`

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-timeline`,
      options: {
        prismPreset: `github`,
      },
    },
  ],
}
```

As an alternative, you can install a package with a prism theme into your project and pass the package name.

This option is null by default, and in all cases local shadowed styles take precedent.

##### Highlight Line

You can highlight code snippets using `// highlight line` or a combination of `// highlight-start` and `// highlight-end`.

To update the styling for these highlights override the `.highlight` styles inside your prism theme.

## Full Screen

![Full](https://i.imgur.com/rDfJury.jpg)
