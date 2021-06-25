const withDefaults = require(`./utils/default-options`)
const kebabCase = require(`lodash/kebabCase`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const moment = require(`moment`)
const debug = require(`debug`)
const fs = require(`fs`)
const debugTheme = debug(`gatsby-theme-timeline-core`)
const { htmlToText } = require(`html-to-text`)
const { truncate } = require(`./utils/truncate`)
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)
const {
  TWEET_TYPE_NAME,
  REDDIT_TYPE_NAME,
  HN_TYPE_NAME,
  PH_TYPE_NAME,
  EXCERPT_LENGTH,
  REDIRECT_TYPE_NAME,
  YOUTUBE_TYPE_NAME,
  INSTAGRAM_TYPE_NAME,
} = require(`./utils/constans`)
const { createContentDigest, urlResolve } = require(`gatsby-core-utils`)
const indexPages = {}
let firstDetailPage = null // temp for blog core create detail page
// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()
  const { dataPath, contentPath } = withDefaults(themeOptions)

  const dirs = [
    path.join(program.directory, dataPath),
    path.join(program.directory, contentPath),
  ]

  dirs.forEach((dir) => {
    debugTheme(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Video {
      url: String
      embed: Boolean
      width: Int
      height: Int
    }
  `)
  createTypes(`interface TimelinePost @blogPostInterface {
    provider: String
    url: String
    originalUrl: String
    imageRemote: String
    video: Video
    channel: String
    channelUrl: String
    author: String
    authorUrl: String
    authorImage: File
    authorSlug: String
    score: Int
    views: Int
    sharedCount: Int
    likeCount: Int
    thirdPartyId: String
  }`)

  createTypes(`
    type Fields {
      basePath: String
      year: Int
      month: Int
      yearMonth: String
    }
    type DisqusConfig {
      shortname: String
    }
    type UtterancesConfig {
      repo: String
      theme: String
      label: String
      issueTerm: String
    }
    type TimelineThemeConfig implements Node {
      webfontURL: String
      disqus: DisqusConfig
      utterances: UtterancesConfig
    }
    type Site implements Node {
      siteMetadata: SiteMetadata
    }
    type SiteMetadata {
      menuLinks: [MenuLinks]
      telegram: String
    }
    type SiteSiteMetadataSocial {
      name: String
      url: String
      external: Boolean
      prefetch: Boolean
    }
    type MenuLinks {
      name: String!
      url: String!
      external: Boolean
      prefetch: Boolean
    }
    type SharedContent implements TimelinePost & BlogPost & Node @dontInfer {
      provider: String
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      thirdPartyId: String
      excerpt: String!
      image: File
      imageCaptionText: String
      imageCaptionLink: String
      imageRemote: String
      imageAlt: String
      socialImage: File
      url: String
      originalUrl: String
      video: Video
      channel: String
      channelUrl: String
      author: String
      authorUrl: String
      authorImage: File
      authorSlug: String
      score: Int
      views: Int
      sharedCount: Int
      likeCount: Int
    }
    type SocialMediaPost implements BlogPost & Node @dontInfer {
      provider: String
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      excerpt: String!
      image: File
      imageCaptionText: String
      imageCaptionLink: String
      imageRemote: String
      imageAlt: String
      socialImage: File
      url: String
      channel: String
      channelUrl: String
      originalUrl: String
      imageRemote: String
      video: Video
      author: String
      authorSlug: String
      authorUrl: String
      authorImage: File
      score: Int
      views: Int
      sharedCount: Int
      likeCount: Int
      thirdPartyId: String
      sharedContent: SharedContent
    }
   
  `)
}
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MdxBlogPost: {
      fields: {
        type: `Fields`,
      },
      tags: {
        resolve: (source) => {
          if (source.tags.includes(`post`)) {
            return source.tags
          } else {
            return source.tags.concat(`post`)
          }
        },
      },
    },
    SharedContent: {
      image: {
        resolve: (source, _, context, __) => {
          if (source.image___NODE) {
            return context.nodeModel.getNodeById({
              id: source.image___NODE,
            })
          }
        },
      },
      authorImage: {
        resolve: (source, _, context, __) => {
          if (source.authorImage___NODE) {
            return context.nodeModel.getNodeById({
              id: source.authorImage___NODE,
            })
          }
        },
      },
    },
    SocialMediaPost: {
      fields: {
        type: `Fields`,
      },
      image: {
        resolve: (source, _, context, __) => {
          if (source.image___NODE) {
            return context.nodeModel.getNodeById({
              id: source.image___NODE,
            })
          }
        },
      },
      authorImage: {
        resolve: (source, _, context, __) => {
          if (source.authorImage___NODE) {
            return context.nodeModel.getNodeById({
              id: source.authorImage___NODE,
            })
          }
        },
      },
    },
  }
  createResolvers(resolvers)
}
exports.sourceNodes = (
  { actions, createContentDigest },
  { webfontURL = ``, disqus = {}, utterances = {} }
) => {
  const { createNode } = actions

  const timelineThemeConfig = {
    webfontURL,
    disqus,
    utterances,
  }

  createNode({
    ...timelineThemeConfig,
    id: `gatsby-theme-timeline-config`,
    parent: null,
    children: [],
    internal: {
      type: `TimelineThemeConfig`,
      contentDigest: createContentDigest(timelineThemeConfig),
      content: JSON.stringify(timelineThemeConfig),
      description: `Options for gatsby-theme-timeline`,
    },
  })
}

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions
  const {
    basePath,
    imageMaxWidth,
    imageMaxHeight,
    postsPerPage,
    tagPostsPerPage,
    postsFilter,
    redirectTypeName,
    siteMetadata,
    skipCreateIndexPages,
    skipCreateTagPages,
    skipCreateDetailPages,
  } = withDefaults(themeOptions)

  // create limit >1000 detail page, cause blog-core limit 1000
  // https://github.com/gatsbyjs/themes/pull/136 wait merged
  if (!skipCreateDetailPages) {
    const detailsPageResult = await graphql(`
      {
        allBlogPost(sort: { fields: [date, title], order: DESC }) {
          nodes {
            id
            slug
            date
            __typename
            ... on SocialMediaPost {
              parent {
                internal {
                  type
                }
              }
            }
          }
        }
      }
    `)

    if (detailsPageResult.errors) {
      reporter.panic(detailsPageResult.errors)
    }

    // Create Posts and Post pages.
    const { allBlogPost: allDetailBlogPost } = detailsPageResult.data
    const detailPosts = allDetailBlogPost.nodes
    const PostTemplate = require.resolve(
      `gatsby-theme-blog-core/src/templates/post-query`
    )

    // Create a page for each Post
    detailPosts.forEach((post, index) => {
      // not create redirect type post
      const previous =
        index === detailPosts.length - 1 ? null : detailPosts[index + 1]
      const next = index === 0 ? null : detailPosts[index - 1]
      const { slug } = post
      const pageInfo = {
        path: slug,
        component: PostTemplate,
        context: {
          id: post.id,
          previousId: previous ? previous.id : undefined,
          nextId: next ? next.id : undefined,
          maxWidth: imageMaxWidth,
          siteMetadata,
        },
      }
      if (index === 0) {
        firstDetailPage = pageInfo
      }
      if (
        post.__typename === `SocialMediaPost` &&
        redirectTypeName.includes(post.parent.internal.type)
      ) {
        return
      }

      createPage(pageInfo)
    })
  }

  if (skipCreateIndexPages && skipCreateTagPages) {
    return
  }
  // These templates are simply data-fetching wrappers that import components
  // const ItemTemplate = require.resolve(`./src/templates/post-query`)
  const ItemsTemplate = require.resolve(`./src/templates/posts-query`)
  const result = await graphql(
    `
      query ItemsCreatePageQuery($filter: BlogPostFilterInput) {
        allBlogPost(
          sort: { fields: [date, title], order: DESC }
          filter: $filter
        ) {
          nodes {
            id
            slug
          }
        }
        tagsGroup: allBlogPost(
          sort: { fields: [date, title], order: DESC }
          filter: $filter
        ) {
          group(field: tags) {
            fieldValue
            nodes {
              id
              slug
            }
          }
        }
      }
    `,
    {
      filter: postsFilter,
    }
  )

  if (result.errors) {
    reporter.panic(result.errors)
  }
  if (!skipCreateIndexPages) {
    // Create Posts and Post pages.
    const { allBlogPost } = result.data
    const posts = allBlogPost.nodes
    const totalPages = Math.ceil(posts.length / postsPerPage)
    const total = posts.length
    // create posts pages
    Array.from({ length: totalPages }).forEach((_, i) => {
      const pageInfo = {
        path: i === 0 ? `${basePath}` : urlResolve(basePath, `page/${i + 1}`),
        component: ItemsTemplate,
        context: {
          basePath,
          pageType: `home`,
          tagsFilter: postsFilter,
          filter: postsFilter,
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages,
          total: total,
          currentPage: i + 1,
          maxWidth: imageMaxWidth,
          maxHeight: imageMaxHeight,
          siteMetadata,
        },
      }
      if (i === 0) {
        indexPages[basePath] = pageInfo
        return
      }
      createPage(pageInfo)
    })
  }

  if (!skipCreateTagPages) {
    // Create tag Posts
    const {
      tagsGroup: { group },
    } = result.data
    // Make tag pages
    group.forEach((tag) => {
      const tagPosts = tag.nodes
      const tagTotalPages = Math.ceil(tagPosts.length / tagPostsPerPage)
      const tagTotal = tagPosts.length
      const tagPostsFilter = Object.assign({}, postsFilter)
      if (postsFilter && postsFilter.tags) {
        tagPostsFilter.tags = {
          ...postsFilter.tags,
          eq: tag.fieldValue,
        }
      } else {
        tagPostsFilter.tags = { eq: tag.fieldValue }
      }
      // create posts pages
      Array.from({ length: tagTotalPages }).forEach((_, i) => {
        createPage({
          path:
            i === 0
              ? urlResolve(`${basePath}`, `tags/${kebabCase(tag.fieldValue)}/`)
              : urlResolve(
                  `${basePath}`,
                  `tags/${kebabCase(tag.fieldValue)}/page/${i + 1}`
                ),
          component: ItemsTemplate,
          context: {
            basePath,
            pageType: `tag`,
            tag: tag.fieldValue,
            tagsFilter: postsFilter,
            filter: tagPostsFilter,
            limit: tagPostsPerPage,
            skip: i * tagPostsPerPage,
            total: tagTotal,
            totalPages: tagTotalPages,
            currentPage: i + 1,
            maxWidth: imageMaxWidth,
            maxHeight: imageMaxHeight,
            siteMetadata,
          },
        })
      })
    })
  }
}

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, createNodeId, getNode, store, cache, reporter },
  themeOptions
) => {
  const {
    createNode: createNodeFn,
    createParentChildLink,
    createNodeField,
  } = actions
  const createNode = async (theNode) => {
    await createNodeFn(theNode)
    const type = theNode.internal.type
    const allowTypes = [`SocialMediaPost`, `MdxBlogPost`]
    if (allowTypes.includes(type) && theNode.date) {
      const date = new Date(theNode.date)
      const year = date.getUTCFullYear()
      const month = date.getUTCMonth() + 1
      const yearMonth = `${year}-${month}`
      createNodeField({ node: getNode(theNode.id), name: `year`, value: year })
      createNodeField({
        node: getNode(theNode.id),
        name: `month`,
        value: month,
      })
      createNodeField({
        node: getNode(theNode.id),
        name: `yearMonth`,
        value: yearMonth,
      })
    }
  }
  const {
    tweetTypeName,
    redditTypeName,
    hnTypeName,
    phTypeName,
    redirectTypeName,
    youtubeTypeName,
    instagramTypeName,
    basePath,
    shouldTransformImage,
    postStartTime,
    postEndTime,
    contentPath,
  } = withDefaults(themeOptions)
  const shouldCreate = (date) => {
    if (postStartTime || postEndTime) {
      if (date) {
        const postDate = new Date(date)
        if (postStartTime && postEndTime) {
          const postStartDate = new Date(postStartTime)
          const postEndDate = new Date(postEndTime)
          if (postDate >= postStartDate && postDate < postEndDate) {
            return true
          } else {
            return false
          }
        } else if (postStartTime) {
          const postStartDate = new Date(postStartTime)
          if (postDate >= postStartDate) {
            return true
          } else {
            return false
          }
        } else if (postEndTime) {
          const postEndDate = new Date(postEndTime)
          if (postDate < postEndDate) {
            return true
          } else {
            return false
          }
        }
      } else {
        return true
      }
    }

    return true
  }
  let allTweetsTypeName = []
  if (typeof tweetTypeName === `string`) {
    allTweetsTypeName.push(tweetTypeName)
  } else if (Array.isArray(tweetTypeName)) {
    allTweetsTypeName = tweetTypeName
  }
  let allRedditTypeName = []
  if (typeof redditTypeName === `string`) {
    allRedditTypeName.push(redditTypeName)
  } else if (Array.isArray(redditTypeName)) {
    allRedditTypeName = redditTypeName
  }

  let allHnTypeName = []
  if (typeof hnTypeName === `string`) {
    allHnTypeName.push(hnTypeName)
  } else if (Array.isArray(hnTypeName)) {
    allHnTypeName = hnTypeName
  }
  let allRedirectTypeName = []
  if (typeof redirectTypeName === `string`) {
    allRedirectTypeName.push(redirectTypeName)
  } else if (Array.isArray(redirectTypeName)) {
    allRedirectTypeName = redirectTypeName
  }

  let allPhTypeName = []
  if (typeof phTypeName === `string`) {
    allPhTypeName.push(phTypeName)
  } else if (Array.isArray(phTypeName)) {
    allPhTypeName = phTypeName
  }

  let allYoutubeTypeName = []
  if (typeof youtubeTypeName === `string`) {
    allYoutubeTypeName.push(youtubeTypeName)
  } else if (Array.isArray(youtubeTypeName)) {
    allYoutubeTypeName = youtubeTypeName
  }
  let allInstagramTypeName = []
  if (typeof instagramTypeName === `string`) {
    allInstagramTypeName.push(instagramTypeName)
  } else if (Array.isArray(instagramTypeName)) {
    allInstagramTypeName = instagramTypeName
  }
  if (allTweetsTypeName.includes(node.internal.type)) {
    const date = moment(
      node.created_at,
      `dd MMM DD HH:mm:ss ZZ YYYY`,
      `en`
    ).toISOString()
    if (!shouldCreate(date)) {
      return
    }
    const tweetText = node.full_text
    const author = node.user.name
    const authorSlug = node.user.screen_name
    const authorUrl = `https://twitter.com/${node.user.screen_name}`
    const authorAvatarUrl = node.user.profile_image_url_https.replace(
      `_normal.`,
      `.`
    )

    const retweeted = !!node.retweeted_status
    const isQuoteStatus = !!node.quoted_status
    const sharedCount = node.retweet_count
    const likeCount = node.favorite_count
    const score = sharedCount * 2 + likeCount
    const fieldData = {
      provider: `Twitter`,
      title: tweetText,
      excerpt: ``,
      thirdPartyId: node.id_str,
      body: ``,
      tags: node.entities.hashtags.map((tag) => tag.text) || [],
      slug: urlResolve(basePath, `tweet/${node.id_str}`),
      date: date,
      author,
      authorSlug,
      authorUrl,
      authorImage___NODE: await createLocalImage(authorAvatarUrl),
      score,
      sharedCount,
      likeCount,
      url: `https://twitter.com/${authorSlug}/statuses/${node.id_str}`,
    }
    if (
      node.entities &&
      node.entities.media &&
      node.entities.media[0] &&
      node.entities.media[0].media_url_https
    ) {
      fieldData.imageAlt = `Tweet Image`
      fieldData.imageRemote = node.entities.media[0].media_url_https
      fieldData.image___NODE = await createLocalImage(fieldData.imageRemote)
    }

    if (retweeted || isQuoteStatus) {
      const sharedStatus = node.retweeted_status || node.quoted_status

      const sharedCreated = moment(
        sharedStatus.created_at,
        `dd MMM DD HH:mm:ss ZZ YYYY`,
        `en`
      ).toISOString()
      const sharedAuthorImageRemote =
        sharedStatus.user.profile_image_url_https.replace(`_normal.`, `.`)
      fieldData.sharedContent = {
        id: sharedStatus.id_str,
        thirdPartyId: sharedStatus.id_str,
        title: sharedStatus.full_text,
        body: ``,
        slug: ``,
        date: sharedCreated,
        tags: sharedStatus.entities.hashtags.map((tag) => tag.text) || [],
        excerpt: ``,
        url: `https://twitter.com/${sharedStatus.user.screen_name}/statuses/${sharedStatus.id_str}`,
        author: sharedStatus.user.name,
        authorUrl: `https://twitter.com/statuses/${sharedStatus.user.screen_name}`,
        authorImage___NODE: await createLocalImage(sharedAuthorImageRemote),
        authorSlug: sharedStatus.user.screen_name,
      }

      if (
        sharedStatus.entities &&
        sharedStatus.entities.media &&
        sharedStatus.entities.media[0] &&
        sharedStatus.entities.media[0].media_url_https
      ) {
        fieldData.sharedContent.imageAlt = `Tweet Image`
        fieldData.sharedContent.imageRemote =
          sharedStatus.entities.media[0].media_url_https
        fieldData.sharedContent.image___NODE = await createLocalImage(
          fieldData.imageRemote
        )
      }
    }

    // add tweet tag
    if (!fieldData.tags.includes(`tweet`)) {
      fieldData.tags.push(`tweet`)
    }

    const tweetNodeId = `${TWEET_TYPE_NAME}-${node.id_str}`
    await createNode({
      ...fieldData,
      // Required fields.
      id: tweetNodeId,
      parent: node.id,
      children: [],
      internal: {
        type: `SocialMediaPost`,
        contentDigest: createContentDigest(fieldData),
        content: ``,
        description: `${TWEET_TYPE_NAME} of the Item interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(tweetNodeId) })
    // createNodeField
    createNodeField({
      node: getNode(tweetNodeId),
      name: `basePath`,
      value: basePath,
    })
  }
  if (allRedditTypeName.includes(node.internal.type)) {
    const date = new Date(node.created_utc * 1000).toISOString()
    if (!shouldCreate(date)) {
      return
    }
    const author = node.author
    let text = ``
    if (node.selftext_html) {
      text = htmlToText(node.selftext_html, {
        tags: {
          a: {
            options: {
              hideLinkHrefIfSameAsText: true,
            },
          },
        },
      })
    }
    const tags = [node.subreddit]
    const excerpt = truncate(text, EXCERPT_LENGTH)
    const postHint = node.postHint
    const redditUrl = `https://www.reddit.com${node.permalink}`
    const fieldData = {
      provider: `Reddit`,
      title: node.title,
      thirdPartyId: node.id,
      excerpt: excerpt,
      body: node.selftext_html || ``,
      tags: tags,
      slug: urlResolve(basePath, `reddit${node.permalink}`),
      date: date,
      author,
      authorSlug: author,
      authorUrl: `https://www.reddit.com/user/${node.author}`,
      channel: node.subreddit,
      channelUrl: `https://www.reddit.com/r/${node.subreddit}`,
      url: redditUrl,
      originalUrl:
        node.is_self || postHint === `image` || postHint === `hosted:video`
          ? `https://www.reddit.com${node.permalink}`
          : redditUrl,
      score: node.score,
    }
    // add tweet tag
    if (!fieldData.tags.includes(`reddit`)) {
      fieldData.tags.push(`reddit`)
    }
    if (
      node.media &&
      node.media.reddit_video &&
      node.media.reddit_video.fallback_url
    ) {
      fieldData.video = {
        url: node.media.reddit_video.fallback_url,
        width: node.media.reddit_video.width,
        height: node.media.reddit_video.height,
      }
    } else if (
      node.preview &&
      node.preview.images &&
      node.preview.images[0] &&
      node.preview.images[0].variants &&
      node.preview.images[0].variants.mp4 &&
      node.preview.images[0].variants.mp4.source &&
      node.preview.images[0].variants.mp4.source.url
    ) {
      // gif

      fieldData.video = {
        url: node.preview.images[0].variants.mp4.source.url,
        width: node.preview.images[0].variants.mp4.source.width,
        height: node.preview.images[0].variants.mp4.source.height,
      }
    } else if (
      node.preview &&
      node.preview.reddit_video_preview &&
      node.preview.reddit_video_preview.fallback_url
    ) {
      fieldData.video = {
        url: node.preview.reddit_video_preview.fallback_url,
        width: node.preview.reddit_video_preview.width,
        height: node.preview.reddit_video_preview.height,
      }
    } else if (
      node.preview &&
      node.preview.images &&
      node.preview.images[0] &&
      node.preview.images[0].source &&
      node.preview.images[0].source.url
    ) {
      fieldData.imageAlt = `Reddit Image`
      if (
        node.preview.images[0].resolutions &&
        node.preview.images[0].resolutions.length > 0
      ) {
        fieldData.imageRemote =
          node.preview.images[0].resolutions[
            node.preview.images[0].resolutions.length - 1
          ].url
      } else {
        fieldData.imageRemote = node.preview.images[0].source.url
      }
      if (fieldData.imageRemote) {
        fieldData.image___NODE = await createLocalImage(fieldData.imageRemote)
      }
    }
    if (node.is_video && fieldData.video) {
      // fieldData.video.url = `https://www.reddit.com/mediaembed/${node.id}`
      fieldData.video.url = `https://www.redditmedia.com${node.permalink}?ref_source=embed&amp;ref=share&amp;embed=true`
      fieldData.video.embed = true
    }

    const redditNodeId = `${REDDIT_TYPE_NAME}-${node.id}`
    await createNode({
      ...fieldData,
      // Required fields.
      id: redditNodeId,
      parent: node.id,
      children: [],
      internal: {
        type: `SocialMediaPost`,
        contentDigest: createContentDigest(fieldData),
        content: ``,
        description: `${REDDIT_TYPE_NAME} of the Item interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(redditNodeId) })
    // createNodeField
    createNodeField({
      node: getNode(redditNodeId),
      name: `basePath`,
      value: basePath,
    })
  }

  if (allHnTypeName.includes(node.internal.type)) {
    const date = new Date(node.created_at).toISOString()
    if (!shouldCreate(date)) {
      return
    }
    const author = node.author
    const tags = []
    let channel = ``
    let channelUrl = ``
    if (node._tags && node._tags[0]) {
      tags.push(node._tags[0])
      if (node._tags.includes(`show_hn`)) {
        tags.push(`Show HN`)
        channel = `Show HN`
        channelUrl = `https://news.ycombinator.com/show`
      }
      if (node._tags.includes(`ask_hn`)) {
        tags.push(`ASK HN`)
        channel = `ASK HN`
        channelUrl = `https://news.ycombinator.com/ask`
      }
      if (node._tags.includes(`poll`)) {
        tags.push(`Poll`)
      }
    }
    const excerpt = ``
    const fieldData = {
      provider: `Hacker News`,
      title: node.title,
      thirdPartyId: node.objectID,
      excerpt: excerpt,
      body: ``,
      tags: tags,
      slug: urlResolve(basePath, `hn/${node.objectID}`),
      date: date,
      author,
      authorUrl: `https://news.ycombinator.com/user?id=${author}`,
      url: `https://news.ycombinator.com/item?id=${node.objectID}`,
      originalUrl:
        node.url || `https://news.ycombinator.com/item?id=${node.objectID}`,
      score: node.points,
    }
    if (channel) {
      fieldData.channel = channel
      fieldData.channelUrl = channelUrl
    }
    if (node.image) {
      fieldData.imageRemote = node.image
      fieldData.image___NODE = await createLocalImage(node.image)
    }
    // add  tag
    if (!fieldData.tags.includes(`Hacker News`)) {
      fieldData.tags.push(`Hacker News`)
    }

    const nodeId = `${HN_TYPE_NAME}-${node.objectID}`

    await createNode({
      ...fieldData,
      // Required fields.
      id: nodeId,
      parent: node.id,
      children: [],
      internal: {
        type: `SocialMediaPost`,
        contentDigest: createContentDigest(fieldData),
        content: ``,
        description: `${HN_TYPE_NAME} of the Item interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(nodeId) })
    // createNodeField
    createNodeField({
      node: getNode(nodeId),
      name: `basePath`,
      value: basePath,
    })
  }
  if (allRedirectTypeName.includes(node.internal.type)) {
    const date = new Date(node.created_at).toISOString()
    if (!shouldCreate(date)) {
      return
    }
    const channel = node.author || node.source || ``
    const tags = node.tags || []
    const excerpt = node.excerpt || node.description || ``
    const id = node.id || node.guid || ``
    const fieldUrl = node.url || node.link || ``
    const fieldData = {
      provider: `Google News`,
      title: node.title,
      excerpt: excerpt,
      body: node.body || ``,
      tags: tags,
      slug: urlResolve(
        basePath,
        `redirect/?url=${encodeURIComponent(fieldUrl)}`
      ),
      date: date,
      channel,
      url: fieldUrl,
      originalUrl: fieldUrl,
      channelUrl: node.author_url || ``,
    }
    const nodeId = `${REDIRECT_TYPE_NAME}-${id}`
    if (node.image) {
      fieldData.imageRemote = node.image
      fieldData.image___NODE = await createLocalImage(fieldData.imageRemote)
    }
    await createNode({
      ...fieldData,
      // Required fields.
      id: nodeId,
      parent: node.id,
      children: [],
      internal: {
        type: `SocialMediaPost`,
        contentDigest: createContentDigest(fieldData),
        content: ``,
        description: `${REDIRECT_TYPE_NAME} of the Item interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(nodeId) })
    // createNodeField
    createNodeField({
      node: getNode(nodeId),
      name: `basePath`,
      value: basePath,
    })
  }
  if (allPhTypeName.includes(node.internal.type)) {
    const date = node.createdAt
    if (!shouldCreate(date)) {
      return
    }
    const author = node.user.name
    const authorUrl = node.user.url
    const tags = []
    if (node.topics && node.topics.edges && node.topics.edges.length > 0) {
      node.topics.edges.forEach((edge) => {
        tags.push(edge.node.name)
      })
    }
    const excerpt = node.description
    const fieldData = {
      provider: `Product Hunt`,
      title: `${node.name} - ${node.tagline}`,
      excerpt: excerpt,
      thirdPartyId: node.id,
      body: excerpt,
      tags: tags,
      slug: urlResolve(basePath, `ph/${node.slug}`),
      date: date,
      author,
      authorUrl,
      originalUrl: node.website || node.url,
      url: node.url,
      score: node.votesCount,
    }
    if (node.media && node.media.length > 0) {
      if (node.media[0].type === `video`) {
        fieldData.video = {
          url: node.media[0].videoUrl,
        }
      }
      if (node.media[0].type === `image` && node.media[0].url) {
        fieldData.imageRemote = node.media[0].url
        fieldData.image___NODE = await createLocalImage(fieldData.imageRemote)
      }
    }
    // add  tag
    if (!fieldData.tags.includes(`ProductHunt`)) {
      fieldData.tags.push(`ProductHunt`)
    }

    const nodeId = `${PH_TYPE_NAME}-${node.id}`
    await createNode({
      ...fieldData,
      // Required fields.
      id: nodeId,
      parent: node.id,
      children: [],
      internal: {
        type: `SocialMediaPost`,
        contentDigest: createContentDigest(fieldData),
        content: ``,
        description: `${PH_TYPE_NAME} of the Item interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(nodeId) })
    // createNodeField
    createNodeField({
      node: getNode(nodeId),
      name: `basePath`,
      value: basePath,
    })
  }
  if (allYoutubeTypeName.includes(node.internal.type)) {
    const date = node.created_at || node.isoDate
    if (!shouldCreate(date)) {
      return
    }
    const author = node.author
    const channelUrl = `https://www.youtube.com/channel/${node.channelId}`
    let tags = []
    if (node.tags && node.tags.length > 0) {
      tags = node.tags
    } else {
      tags = findHashtags(node.description)
    }
    const excerpt = node.excerpt || node.description
    let score = Math.floor(
      (node.starRating.count * node.starRating.average) / 5
    )
    if (!(score > 0)) {
      score = 0
    }
    let views = 0
    views = Number(node.statistics.views)
    if (!(views > 0)) {
      views = 0
    }
    const fieldData = {
      provider: `Youtube`,
      title: node.title,
      excerpt: excerpt,
      body: excerpt,
      thirdPartyId: node.videoId,
      tags: tags,
      slug: urlResolve(basePath, `youtube/${node.videoId}`),
      date: date,
      author,
      channelUrl,
      url: node.link,
      score: score,
      views: views,
      video: {
        url: node.link,
      },
    }

    if (node.thumbnail && node.thumbnail.url) {
      fieldData.imageRemote = node.thumbnail.url
      fieldData.image___NODE = await createLocalImage(fieldData.imageRemote)
    }

    // add  tag
    if (!fieldData.tags.includes(`Youtube`)) {
      fieldData.tags.push(`Youtube`)
    }

    const nodeId = `${YOUTUBE_TYPE_NAME}-${node.id}`
    await createNode({
      ...fieldData,
      // Required fields.
      id: nodeId,
      parent: node.id,
      children: [],
      internal: {
        type: `SocialMediaPost`,
        contentDigest: createContentDigest(fieldData),
        content: ``,
        description: `${YOUTUBE_TYPE_NAME} of the Item interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(nodeId) })
    // createNodeField
    createNodeField({
      node: getNode(nodeId),
      name: `basePath`,
      value: basePath,
    })
  }
  if (allInstagramTypeName.includes(node.internal.type)) {
    // TODO
    const date = new Date(node.createdAt || node.timestamp).toISOString()
    if (!shouldCreate(date)) {
      return
    }
    const author = node.username
    const channelUrl = `https://www.instagram.com//${node.username}`
    let tags = []
    if (node.tags && node.tags.length > 0) {
      tags = node.tags
    } else {
      tags = findHashtags(node.caption)
    }

    const fieldData = {
      provider: `Instagram`,
      title: node.caption,
      excerpt: ``,
      body: ``,
      thirdPartyId: node.id,
      tags: tags,
      slug: urlResolve(basePath, `instagram/${node.id}`),
      date: date,
      author,
      channel: author,
      channelUrl,
      authorUrl: channelUrl,
      url: node.permalink,
      originalUrl: node.permalink,
    }

    if (node.original || node.media_url) {
      if (node.mediaType === `VIDEO` || node.media_type === `VIDEO`) {
        fieldData.video = {
          url: node.original || node.media_url,
        }
        if (node.preview || node.thumbnail_url) {
          fieldData.imageRemote = node.preview || node.thumbnail_url
          fieldData.image___NODE = await createLocalImage(fieldData.imageRemote)
        }
      } else {
        fieldData.imageRemote = node.original || node.media_url
        fieldData.image___NODE = await createLocalImage(fieldData.imageRemote)
      }
    }

    // add  tag
    if (!fieldData.tags.includes(`Instagram`)) {
      fieldData.tags.push(`Instagram`)
    }

    const nodeId = `${INSTAGRAM_TYPE_NAME}-${node.id}`
    await createNode({
      ...fieldData,
      // Required fields.
      id: nodeId,
      parent: node.id,
      children: [],
      internal: {
        type: `SocialMediaPost`,
        contentDigest: createContentDigest(fieldData),
        content: ``,
        description: `${INSTAGRAM_TYPE_NAME} of the Item interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(nodeId) })
    // createNodeField
    createNodeField({
      node: getNode(nodeId),
      name: `basePath`,
      value: basePath,
    })
  }

  if (node.internal.type === `Mdx`) {
    // Create source field (according to contentPath)
    const fileNode = getNode(node.parent)
    const source = fileNode.sourceInstanceName

    if (node.internal.type === `Mdx` && source === contentPath) {
      let date

      if (node.frontmatter.date) {
        date = new Date(node.frontmatter.date).toISOString()
      }
      if (date) {
        if (!shouldCreate(date)) {
          return
        }
      }
      let slug
      if (node.frontmatter.slug) {
        if (path.isAbsolute(node.frontmatter.slug)) {
          // absolute paths take precedence
          slug = node.frontmatter.slug
        } else {
          // otherwise a relative slug gets turned into a sub path
          slug = urlResolve(basePath, node.frontmatter.slug)
        }
      } else {
        // otherwise use the filepath function from gatsby-source-filesystem
        const filePath = createFilePath({
          node: fileNode,
          getNode,
          basePath: contentPath,
        })

        slug = urlResolve(basePath, filePath)
      }
      // normalize use of trailing slash
      slug = slug.replace(/\/*$/, `/`)

      const fieldData = {
        title: node.frontmatter.title,
        tags: node.frontmatter.tags || [],
        slug,
        date: node.frontmatter.date,
        image: node.frontmatter.image,
        imageAlt: node.frontmatter.imageAlt,
        imageCaptionText: node.frontmatter.imageCaptionText,
        imageCaptionLink: node.frontmatter.imageCaptionLink,
        socialImage: node.frontmatter.socialImage,
      }

      if (validURL(node.frontmatter.image)) {
        // create a file node for image URLs
        const remoteFileNode = await createRemoteFileNode({
          url: node.frontmatter.image,
          parentNodeId: node.id,
          createNode: createNodeFn,
          createNodeId,
          cache,
          store,
        })
        // if the file was created, attach the new node to the parent node
        if (remoteFileNode) {
          fieldData.image___NODE = remoteFileNode.id
        }
      }

      if (validURL(node.frontmatter.socialImage)) {
        // create a file node for image URLs
        const remoteFileNode = await createRemoteFileNode({
          url: node.frontmatter.socialImage,
          parentNodeId: node.id,
          createNode: createNodeFn,
          createNodeId,
          cache,
          store,
        })
        // if the file was created, attach the new node to the parent node
        if (remoteFileNode) {
          fieldData.socialImage___NODE = remoteFileNode.id
        }
      }

      const mdxBlogPostId = createNodeId(`${node.id} >>> MdxBlogPost`)
      await createNode({
        ...fieldData,
        // Required fields.
        id: mdxBlogPostId,
        parent: node.id,
        children: [],
        internal: {
          type: `MdxBlogPost`,
          contentDigest: createContentDigest(fieldData),
          content: ``,
          description: `Mdx implementation of the BlogPost interface`,
        },
      })
      createParentChildLink({ parent: node, child: getNode(mdxBlogPostId) })
      createNodeField({
        node: getNode(mdxBlogPostId),
        name: `basePath`,
        value: basePath,
      })
    }
  }

  async function createLocalImage(url, shouldCreateLocalImage) {
    let fileNodeId = ``
    if (url && (shouldTransformImage || shouldCreateLocalImage)) {
      try {
        const remoteFileNode = await createRemoteFileNode({
          url: url,
          parentNodeId: node.id,
          createNode: createNodeFn,
          createNodeId,
          cache,
          store,
        })
        // if the file was created, attach the new node to the parent node
        if (remoteFileNode) {
          fileNodeId = remoteFileNode.id
        }
      } catch (error) {
        reporter.warn(`create remote file for this image: ${error}`)
      }
    }
    return fileNodeId
  }
}
exports.onCreatePage = function ({ page, actions }, themeOptions) {
  const { basePath, skipCreateDetailPages, skipCreateIndexPages } =
    withDefaults(themeOptions)
  const { createPage, deletePage } = actions

  if (
    !page.context.pageType &&
    page.path === basePath &&
    indexPages[basePath]
  ) {
    deletePage(page)
    if (!skipCreateIndexPages) {
      createPage(indexPages[basePath])
    }
  } else if (
    !page.context.siteMetadata &&
    firstDetailPage &&
    page.path === firstDetailPage.path
  ) {
    deletePage(page)
    if (!skipCreateDetailPages) {
      createPage(firstDetailPage)
    }
  }
  // temp
}
function findHashtags(searchText) {
  searchText = searchText || ``
  const regexp = /\B#\w\w+\b/g
  const result = searchText.match(regexp)
  if (result) {
    return result.map((item) => {
      return item.trim().slice(1)
    })
  } else {
    return []
  }
}
function validURL(str) {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}
