const withDefaults = require(`./utils/default-options`)
const withCoreDefaults = require(`gatsby-theme-blog-core/utils/default-options`)
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
  TWEET_TYPE_NAME,
  REDDIT_TYPE_NAME,
  HN_TYPE_NAME,
  PH_TYPE_NAME,
  EXCERPT_LENGTH,
} = require(`./utils/constans`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { createContentDigest, urlResolve } = require(`gatsby-core-utils`)
const indexPages = {}
// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()
  const { dataPath } = withDefaults(themeOptions)

  const dirs = [path.join(program.directory, dataPath)]

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
    type Fields {
      basePath: String
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
    type ${TWEET_TYPE_NAME} implements BlogPost & Node @dontInfer {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      excerpt: String!
      image: File
      imageRemote: String
      imageAlt: String
      socialImage: File
      idStr: String!
      retweeted: Boolean!
      authorName: String!
      authorScreenName: String!
      authorAvatar: File
      authorAvatarRemote: String
      isQuoteStatus: Boolean!
      quoteBody: String
      quoteAuthorName: String
      quoteAuthorScreenName: String
      quoteAuthorAvatar: File
      quoteAuthorAvatarRemote: String
      quoteImage: File
      quoteImageRemote: String
    }
    type ${REDDIT_TYPE_NAME} implements BlogPost & Node @dontInfer {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      excerpt: String!
      image: File
      imageRemote: String
      imageAlt: String
      socialImage: File
      permalink: String!
      authorName: String!
      video: String
      videoWidth: Int
      videoHeight: Int
      subreddit: String!
      isSelf: Boolean!
      isVideo: Boolean!
      postHint: String
      url: String
      html: String
      score: Int
      redditId: String
    }
    type ${HN_TYPE_NAME} implements BlogPost & Node @dontInfer {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      excerpt: String!
      image: File
      imageRemote: String
      imageAlt: String
      socialImage: File
      score: Int
      hnId: String!
      authorName: String!
      url: String
    }
    type ${PH_TYPE_NAME} implements BlogPost & Node @dontInfer {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      excerpt: String!
      image: File
      imageRemote: String
      imageAlt: String
      socialImage: File
      video: String
      tagline: String
      score: Int
      authorName: String!
      authorUrl: String
      url: String
      phUrl: String
      phId: String
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
    [TWEET_TYPE_NAME]: {
      fields: {
        type: `Fields`,
      },
      authorAvatar: {
        resolve: (source, _, context, __) => {
          if (source.authorAvatar___NODE) {
            return context.nodeModel.getNodeById({
              id: source.authorAvatar___NODE,
            })
          }
        },
      },
      quoteAuthorAvatar: {
        resolve: (source, _, context, __) => {
          if (source.quoteAuthorAvatar___NODE) {
            return context.nodeModel.getNodeById({
              id: source.quoteAuthorAvatar___NODE,
            })
          }
        },
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
      quoteImage: {
        resolve: (source, _, context, __) => {
          if (source.quoteImage___NODE) {
            return context.nodeModel.getNodeById({
              id: source.quoteImage___NODE,
            })
          }
        },
      },
    },
    [REDDIT_TYPE_NAME]: {
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
    },
    [HN_TYPE_NAME]: {
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
    },
    [PH_TYPE_NAME]: {
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
    postsFilter,
  } = withDefaults(themeOptions)

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
      },
    }
    if (i === 0) {
      indexPages[basePath] = pageInfo
      return
    }
    createPage(pageInfo)
  })

  // Create tag Posts
  const {
    tagsGroup: { group },
  } = result.data
  // Make tag pages
  group.forEach((tag) => {
    const tagPosts = tag.nodes
    const tagTotalPages = Math.ceil(tagPosts.length / postsPerPage)
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
          limit: postsPerPage,
          skip: i * postsPerPage,
          total: tagTotal,
          totalPages: tagTotalPages,
          currentPage: i + 1,
          maxWidth: imageMaxWidth,
          maxHeight: imageMaxHeight,
        },
      })
    })
  })

  // create limit >1000 detail page, cause blog-core limit 1000
  const detailsPageResult = await graphql(`
    {
      allBlogPost(sort: { fields: [date, title], order: DESC }, skip: 1000) {
        nodes {
          id
          slug
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
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    const { slug } = post
    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.id : undefined,
        nextId: next ? next.id : undefined,
        maxWidth: imageMaxWidth,
      },
    })
  })
}

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, createNodeId, getNode, store, cache, reporter },
  themeOptions
) => {
  const { createNode, createParentChildLink, createNodeField } = actions
  const {
    tweetTypeName,
    redditTypeName,
    hnTypeName,
    phTypeName,
    basePath,
    shouldTransformImage,
  } = withDefaults(themeOptions)
  const { contentPath } = withCoreDefaults(themeOptions)
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

  let allPhTypeName = []
  if (typeof phTypeName === `string`) {
    allPhTypeName.push(phTypeName)
  } else if (Array.isArray(phTypeName)) {
    allPhTypeName = phTypeName
  }
  if (allTweetsTypeName.includes(node.internal.type)) {
    const date = moment(
      node.created_at,
      `dd MMM DD HH:mm:ss ZZ YYYY`,
      `en`
    ).toISOString()
    let tweetText = node.full_text
    let authorName = node.user.name
    let authorScreenName = node.user.screen_name
    let authorAvatarUrl = node.user.profile_image_url_https
    const retweeted = node.retweeted
    const isQuoteStatus = node.is_quote_status
    if (retweeted) {
      tweetText = node.retweeted_status.full_text
      authorName = node.retweeted_status.user.name
      authorScreenName = node.retweeted_status.user.screen_name
      authorAvatarUrl = node.retweeted_status.user.profile_image_url_https
    }

    const fieldData = {
      title: tweetText,
      excerpt: tweetText,
      body: tweetText,
      tags: node.entities.hashtags.map((tag) => tag.text) || [],
      slug: urlResolve(basePath, `tweet/${node.id_str}`),
      date: date,
      authorName,
      authorScreenName,
      idStr: node.id_str,
      retweeted,
      isQuoteStatus,
    }
    if (isQuoteStatus) {
      fieldData.quoteBody = node.quoted_status.full_text
      fieldData.quoteAuthorName = node.quoted_status.user.name
      fieldData.quoteAuthorScreenName = node.quoted_status.user.screen_name
      fieldData.quoteAuthorAvatarRemote =
        node.quoted_status.user.profile_image_url_https
      // create a file node for image URLs
      if (shouldTransformImage) {
        try {
          const remoteFileNode = await createRemoteFileNode({
            url: node.quoted_status.user.profile_image_url_https,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            cache,
            store,
          })
          // if the file was created, attach the new node to the parent node
          if (remoteFileNode) {
            fieldData.quoteAuthorAvatar___NODE = remoteFileNode.id
          }
        } catch (error) {
          reporter.warn(
            `create remote file for tweet quoted_status author avatar failed: ${error}`
          )
        }
      }

      if (
        node.quoted_status.entities &&
        node.quoted_status.entities.media &&
        node.quoted_status.entities.media[0] &&
        node.quoted_status.entities.media[0].media_url_https
      ) {
        fieldData.quoteImageRemote =
          node.quoted_status.entities.media[0].media_url_https
        if (shouldTransformImage) {
          try {
            // create a file node for image URLs
            const remoteFileNode = await createRemoteFileNode({
              url: node.quoted_status.entities.media[0].media_url_https,
              parentNodeId: node.id,
              createNode,
              createNodeId,
              cache,
              store,
            })
            // if the file was created, attach the new node to the parent node
            if (remoteFileNode) {
              fieldData.quoteImage___NODE = remoteFileNode.id
            }
          } catch (error) {
            reporter.warn(
              `create remote file for tweet quoted_status media failed: ${error}`
            )
          }
        }
      }
    }
    // add tweet tag
    if (!fieldData.tags.includes(`tweet`)) {
      fieldData.tags.push(`tweet`)
    }
    if (
      node.entities &&
      node.entities.media &&
      node.entities.media[0] &&
      node.entities.media[0].media_url_https
    ) {
      fieldData.imageAlt = `Tweet Image`
      fieldData.imageRemote = node.entities.media[0].media_url_https
      if (shouldTransformImage) {
        try {
          // create a file node for image URLs
          const remoteFileNode = await createRemoteFileNode({
            url: node.entities.media[0].media_url_https,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            cache,
            store,
          })
          // if the file was created, attach the new node to the parent node
          if (remoteFileNode) {
            fieldData.image___NODE = remoteFileNode.id
          }
        } catch (error) {
          reporter.warn(`create remote file for tweet media failed: ${error}`)
        }
      }
    }

    // create a file node for image URLs
    // try to use origin avatar res
    if (authorAvatarUrl) {
      authorAvatarUrl = authorAvatarUrl.replace(`_normal.jpg`, `.jpg`)
    }
    fieldData.authorAvatarRemote = authorAvatarUrl
    if (shouldTransformImage) {
      try {
        const remoteFileNode = await createRemoteFileNode({
          url: authorAvatarUrl,
          parentNodeId: node.id,
          createNode,
          createNodeId,
          cache,
          store,
        })
        // if the file was created, attach the new node to the parent node
        if (remoteFileNode) {
          fieldData.authorAvatar___NODE = remoteFileNode.id
        }
      } catch (error) {
        reporter.warn(
          `create remote file for tweet author avatar failed: ${error}`
        )
      }
    }

    const tweetNodeId = `${TWEET_TYPE_NAME}-${node.id_str}`
    await createNode({
      ...fieldData,
      // Required fields.
      id: tweetNodeId,
      parent: node.id,
      children: [],
      internal: {
        type: TWEET_TYPE_NAME,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
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
    const authorName = node.author
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
    const fieldData = {
      title: node.title,
      excerpt: excerpt,
      body: node.selftext_html || ``,
      html: node.selftext_html || ``,
      tags: tags,
      slug: urlResolve(basePath, `reddit${node.permalink}`),
      date: date,
      authorName,
      subreddit: node.subreddit,
      permalink: node.permalink,
      isSelf: node.is_self,
      isVideo: node.is_video,
      url: node.url_overridden_by_dest,
      postHint: node.post_hint,
      score: node.score,
      redditId: node.id,
    }
    // add tweet tag
    if (!fieldData.tags.includes(`reddit`)) {
      fieldData.tags.push(`reddit`)
    }
    if (
      node.media &&
      node.media.reddit_video &&
      node.media.reddit_video.hls_url
    ) {
      fieldData.video = node.media.reddit_video.fallback_url
      fieldData.videoWidth = node.media.reddit_video.width
      fieldData.videoHeight = node.media.reddit_video.height
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
      fieldData.video = node.preview.images[0].variants.mp4.source.url
      fieldData.videoWidth = node.preview.images[0].variants.mp4.source.width
      fieldData.videoHeight = node.preview.images[0].variants.mp4.source.height
    } else if (
      node.preview &&
      node.preview.reddit_video_preview &&
      node.preview.reddit_video_preview.fallback_url
    ) {
      // gif
      fieldData.video = node.preview.reddit_video_preview.fallback_url
      fieldData.videoWidth = node.preview.reddit_video_preview.width
      fieldData.videoHeight = node.preview.reddit_video_preview.height
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

      // create a file node for image URLs
      if (shouldTransformImage) {
        try {
          const remoteFileNode = await createRemoteFileNode({
            url: node.preview.images[0].source.url,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            cache,
            store,
          })
          // if the file was created, attach the new node to the parent node
          if (remoteFileNode) {
            fieldData.image___NODE = remoteFileNode.id
          }
        } catch (error) {
          reporter.warn(`create remote file for reddit media failed: ${error}`)
        }
      }
    }

    const redditNodeId = `${REDDIT_TYPE_NAME}-${node.id}`
    await createNode({
      ...fieldData,
      // Required fields.
      id: redditNodeId,
      parent: node.id,
      children: [],
      internal: {
        type: REDDIT_TYPE_NAME,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
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
    const authorName = node.author
    const tags = []
    if (node._tags && node._tags[0]) {
      tags.push(node._tags[0])
    }
    const excerpt = ``
    const fieldData = {
      title: node.title,
      excerpt: excerpt,
      body: ``,
      tags: tags,
      slug: urlResolve(basePath, `hn/${node.objectID}`),
      date: date,
      authorName,
      url: node.url,
      score: node.points,
      hnId: node.objectID,
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
        type: HN_TYPE_NAME,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
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
  if (allPhTypeName.includes(node.internal.type)) {
    const date = node.createdAt
    const authorName = node.user.name
    const authorUrl = node.user.url
    const tags = []
    if (node.topics && node.topics.edges && node.topics.edges.length > 0) {
      node.topics.edges.forEach((edge) => {
        tags.push(edge.node.name)
      })
    }
    const excerpt = node.description
    const fieldData = {
      title: node.name,
      excerpt: excerpt,
      body: excerpt,
      tags: tags,
      slug: urlResolve(basePath, `ph/${node.slug}`),
      date: date,
      authorName,
      authorUrl,
      url: node.website,
      phUrl: node.url,
      phId: node.id,
      score: node.votesCount,
      tagline: node.tagline,
    }
    if (node.media && node.media.length > 0) {
      if (node.media[0].type === `video`) {
        fieldData.video = node.media[0].videoUrl
      }
      if (node.media[0].type === `image` && node.media[0].url) {
        fieldData.imageRemote = node.media[0].url
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
        type: PH_TYPE_NAME,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
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
  if (node.internal.type === `MdxBlogPost`) {
    // Create source field (according to contentPath)
    const mdxNode = getNode(node.parent)
    const fileNode = getNode(mdxNode.parent)
    const sourceInstanceName = fileNode.sourceInstanceName
    if (sourceInstanceName === contentPath) {
      createNodeField({
        node: node,
        name: `basePath`,
        value: basePath,
      })
    }
  }
}
exports.onCreatePage = function ({ page, actions }, themeOptions) {
  const { basePath } = withDefaults(themeOptions)
  const { createPage, deletePage } = actions
  if (
    !page.context.pageType &&
    page.path === basePath &&
    indexPages[basePath]
  ) {
    deletePage(page)
    createPage(indexPages[basePath])
  }
}
