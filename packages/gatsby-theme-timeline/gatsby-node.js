const withDefaults = require(`./utils/default-options`)
const kebabCase = require(`lodash/kebabCase`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const moment = require(`moment`)
const debug = require(`debug`)
const fs = require(`fs`)
const debugTheme = debug(`gatsby-theme-timeline-core`)
const { truncate } = require(`./utils/truncate`)
const { TWEET_TYPE_NAME, TITLE_LENGTH } = require(`./utils/constans`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { createContentDigest, urlResolve } = require(`gatsby-core-utils`)
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
    type TimelineThemeConfig implements Node {
      webfontURL: String,
      basePath: String
    }
  `)
  // create tweet type
  createTypes(`type ${TWEET_TYPE_NAME} implements BlogPost & Node @dontInfer {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      excerpt: String!
      image: File
      imageAlt: String
      socialImage: File
      idStr: String!
      retweeted: Boolean!
      authorName: String!
      authorScreenName: String!
      authorAvatar: File
      isQuoteStatus: Boolean!
      quoteBody: String
      quoteAuthorName: String
      quoteAuthorScreenName: String
      quoteAuthorAvatar: File
      quoteImage: File
    }`)
}
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MdxBlogPost: {
      tags: {
        resolve: (source) => {
          if (source.tags.includes("post")) {
            return source.tags
          } else {
            return source.tags.concat(`post`)
          }
        },
      },
    },
    [TWEET_TYPE_NAME]: {
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
  }
  createResolvers(resolvers)
}
exports.sourceNodes = (
  { actions, createContentDigest },
  { webfontURL = ``, basePath = `/` }
) => {
  const { createNode } = actions

  const timelineThemeConfig = {
    webfontURL,
    basePath,
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
  const { basePath, imageMaxWidth, postsPerPage, postsFilter } = withDefaults(
    themeOptions
  )

  // These templates are simply data-fetching wrappers that import components
  // const ItemTemplate = require.resolve(`./src/templates/post-query`)
  const ItemsTemplate = require.resolve(`./src/templates/posts-query`)
  const result = await graphql(
    `
      query ItemsCreatePageQuery($filter: BlogPostFilterInput) {
        allBlogPost(
          sort: { fields: [date, slug], order: DESC }
          filter: $filter
        ) {
          nodes {
            id
            slug
          }
        }
        tagsGroup: allBlogPost(
          sort: { fields: [date, slug], order: DESC }
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
    createPage({
      path: i === 0 ? `${basePath}` : urlResolve(basePath, `page/${i + 1}`),
      component: ItemsTemplate,
      context: {
        pageType: `home`,
        filter: postsFilter,
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPages,
        total: total,
        currentPage: i + 1,
        maxWidth: imageMaxWidth,
      },
    })
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
          pageType: `tag`,
          tag: tag.fieldValue,
          filter: tagPostsFilter,
          limit: postsPerPage,
          skip: i * postsPerPage,
          total: tagTotal,
          totalPages: tagTotalPages,
          currentPage: i + 1,
          maxWidth: imageMaxWidth,
        },
      })
    })
  })
}

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, createNodeId, store, cache },
  themeOptions
) => {
  const { createNode } = actions
  const { tweetTypeName, basePath } = withDefaults(themeOptions)
  if (node.internal.type !== tweetTypeName) {
    return
  }
  if (node.internal.type === tweetTypeName) {
    const date = moment(
      node.created_at,
      `dd MMM DD HH:mm:ss ZZ YYYY`,
      `en`
    ).toDate()
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
      title: `Tweet: "${truncate(tweetText, TITLE_LENGTH)}"`,
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
      // create a file node for image URLs
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
      if (
        node.quoted_status.entities &&
        node.quoted_status.entities.media &&
        node.quoted_status.entities.media[0] &&
        node.quoted_status.entities.media[0].media_url_https
      ) {
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
      }
    }
    // add tweet tag
    if (!fieldData.tags.includes("tweet")) {
      fieldData.tags.push(`tweet`)
    }
    if (
      node.entities &&
      node.entities.media &&
      node.entities.media[0] &&
      node.entities.media[0].media_url_https
    ) {
      fieldData.imageAlt = `Tweet Image`
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
    }

    // create a file node for image URLs
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

    await createNode({
      ...fieldData,
      // Required fields.
      id: `${TWEET_TYPE_NAME}-${node.id}`,
      parent: node.id,
      children: [],
      internal: {
        type: TWEET_TYPE_NAME,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `${TWEET_TYPE_NAME} of the Item interface`,
      },
    })
  }
}
