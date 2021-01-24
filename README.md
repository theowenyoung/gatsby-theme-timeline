# Gatsby Theme Timeline

This is a repo for Gatsby's timeline theme, with the theme, you can show all your posts, tweets, youtube videos at one.

[Live Demo](https://gatsby-theme-timeline.netlify.app/)

![Screen](https://i.imgur.com/qtXnwLQ.png)

## Features

- Support Mdx, tweet, reddit post
- Support i18n by [gatsby-theme-i18n](https://www.gatsbyjs.com/plugins/gatsby-theme-i18n/), you can choose your own [i18n library](https://github.com/gatsbyjs/themes/tree/master/packages)
- Support comments [disqus](https://disqus.com/) or [utterances](https://utteranc.es/)

## 🚀 Quick start

> Learn more about the theme information at [here](https://github.com/theowenyoung/gatsby-theme-timeline/tree/main/packages/gatsby-theme-timeline#readme)

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

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-themed-blog/
    gatsby develop
    ```

1.  **Open the code and start customizing!**

    Your site is now running at `http://localhost:8000`!

    To get started, check out the guide to [using the Gatsby blog theme starter](https://gatsbyjs.com/docs/themes/using-a-gatsby-theme), or the longer, [more detailed tutorial](https://gatsbyjs.com/tutorial/using-a-theme).

For exist site, see [here](https://github.com/theowenyoung/gatsby-theme-timeline/tree/main/packages/gatsby-theme-timeline#readme)

## 🧐 What's inside?

Here are the top-level files and directories you'll see in a site created using the timeline blog theme starter:

```text
gatsby-starter-timeline
├── content
│   ├── assets
│   │   └── avatar.png
│   └── posts
│       ├── hello-world.mdx
│       └── my-second-post.mdx
├── data
│   ├── tweets
│       ├── 1111.json
│       └── 2222.json
│   ├── reddit
│       ├── 1111.json
│       └── 2222.json
├── src
│   └── gatsby-theme-timeline
│       ├── components
│       │   └── bio-content.js
│       └── gatsby-theme-ui
│           └── colors.js
├── .gitignore
├── .prettierrc
├── gatsby-config.js
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

1.  **`/content`**: A content folder holding assets that the theme expects to exist. This will vary from theme to theme -- this starter is set up to get you started with the timeline blog theme, which expects an image asset for your avatar, and blog post content. Replace the avatar image file, delete the demo posts, and add your own!

1.  **`/data`**: A raw data folder holding raw data like tweets, reddit json.

1.  **`/src`**: You will probably want to customize your site to personalize it. The files under `/src/gatsby-theme-blog` _shadow_, or override, the files of the same name in the `gatsby-theme-blog` package. To learn more about this, check out the [guide to getting started with using the timeline blog theme starter](https://gatsbyjs.com/docs/themes/using-a-gatsby-theme).

1.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

1.  **`.prettierrc`**: This file tells [Prettier](https://prettier.io/) which configuration it should use to lint files.

1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. When using themes, it's where you'll include the theme plugin, and any customization options the theme provides.

1.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

1.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

1.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

1.  **`README.md`**: A text file containing useful reference information about your project.

## Full Screen

![Full](https://i.imgur.com/XfXuCRJ.png)

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/).

Here are some places to start:

### Themes

- To learn more about Gatsby themes specifically, we recommend checking out the [theme docs](https://www.gatsbyjs.com/docs/themes/).

### General

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Reference Guides_ and _Gatsby API_ sections in the sidebar.
