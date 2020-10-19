const withDefaults = require(`./utils/default-options`)
const kebabCase = require(`lodash/kebabCase`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const moment = require(`moment`)
const debug = require(`debug`)
const fs = require(`fs`)
const debugTheme = debug(`gatsby-theme-timeline-core`)
const { truncate } = require(`./utils/truncate`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { createContentDigest } = require(`gatsby-core-utils`)
const { TWEET_TYPE_NAME, TITLE_LENGTH } = require(`./utils/constans`)
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
      authorName: String!
      authorId: String!
      authorAvatar: File
    }`)
}
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
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
  { webfontURL = `` }
) => {
  const { createNode } = actions

  const timelineThemeConfig = {
    webfontURL,
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
  const { basePath, imageMaxWidth, postsPerPage } = withDefaults(themeOptions)
  // These templates are simply data-fetching wrappers that import components
  // const ItemTemplate = require.resolve(`./src/templates/post-query`)
  const ItemsTemplate = require.resolve(`./src/templates/posts-query`)
  const TagItemsTemplate = require.resolve(`./src/templates/tag-posts-query`)
  const result = await graphql(`
    {
      allBlogPost(sort: { fields: [date, slug], order: DESC }) {
        nodes {
          id
          slug
        }
      }
      tagsGroup: allBlogPost(sort: { fields: [date, slug], order: DESC }) {
        group(field: tags) {
          fieldValue
          nodes {
            id
            slug
          }
        }
      }
    }
  `)

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
      path: i === 0 ? `${basePath}` : `${basePath}page/${i + 1}`,
      component: ItemsTemplate,
      context: {
        type: `Latest`,
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

    // create posts pages
    Array.from({ length: tagTotalPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `${basePath}tags/${kebabCase(tag.fieldValue)}/`
            : `${basePath}tags/${kebabCase(tag.fieldValue)}/page/${i + 1}`,
        component: TagItemsTemplate,
        context: {
          type: `Tag`,
          tag: tag.fieldValue,
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
  const { tweetTypeName, shouldTransformTweet } = withDefaults(themeOptions)
  if (node.internal.type !== tweetTypeName) {
    return
  }
  if (shouldTransformTweet && node.internal.type === tweetTypeName) {
    const date = moment(
      node.created_at,
      `dd MMM DD HH:mm:ss ZZ YYYY`,
      `en`
    ).toDate()

    const fieldData = {
      title: `Tweet: "${truncate(node.full_text, TITLE_LENGTH)}"`,
      excerpt: node.full_text,
      body: node.full_text,
      tags: node.entities.hashtags.map((tag) => tag.text) || [],
      slug: `/tweet/${node.id_str}`,
      date: date,
      authorName: node.user.name,
      authorId: node.user.screen_name,
      idStr: node.id_str,
    }
    // add tweet tag
    fieldData.tags.push(`tweet`)
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
      url: node.user.profile_image_url_https,
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
