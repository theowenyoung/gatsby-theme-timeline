const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const debug = require(`debug`)
const moment = require(`moment`)
const kebabCase = require(`lodash/kebabCase`)
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)
const { urlResolve, createContentDigest, slash } = require(`gatsby-core-utils`)
const {
  POST_TYPE_NAME,
  TWEET_TYPE_NAME,
  TITLE_LENGTH,
} = require(`./utils/constans`)
const debugTheme = debug(`gatsby-theme-timeline-core`)
const withDefaults = require(`./utils/default-options`)
const { truncate } = require(`./utils/truncate`)

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()
  const { contentPath, dataPath, assetPath } = withDefaults(themeOptions)

  const dirs = [
    path.join(program.directory, contentPath),
    path.join(program.directory, assetPath),
    path.join(program.directory, dataPath),
  ]

  dirs.forEach((dir) => {
    debugTheme(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

const mdxResolverPassthrough = (fieldName) => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  const { excerptLength } = withDefaults(themeOptions)
  const { createTypes } = actions
  // create general item type
  createTypes(`interface Item @nodeInterface {
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
      authorName: String
      authorId: String
      authorAvatar: File
  }`)
  // create tweet type
  createTypes(`type ${TWEET_TYPE_NAME} implements Item & Node {
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
    authorName: String!
    authorId: String!
    authorAvatar: File
    idStr: String!
  }`)
  // create mdx post type
  createTypes(
    schema.buildObjectType({
      name: POST_TYPE_NAME,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`,
        },
        type: {
          type: `String!`,
        },
        slug: {
          type: `String!`,
        },
        date: { type: `Date!`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: excerptLength,
            },
          },
          resolve: mdxResolverPassthrough(`excerpt`),
        },
        image: {
          type: `File`,
          resolve: async (source, args, context, info) => {
            if (source.image___NODE) {
              return context.nodeModel.getNodeById({ id: source.image___NODE })
            } else if (source.image) {
              return processRelativeImage(source, context, `image`)
            }
          },
        },
        imageAlt: {
          type: `String`,
        },
        socialImage: {
          type: `File`,
          resolve: async (source, args, context, info) => {
            if (source.socialImage___NODE) {
              return context.nodeModel.getNodeById({
                id: source.socialImage___NODE,
              })
            } else if (source.socialImage) {
              return processRelativeImage(source, context, `socialImage`)
            }
          },
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`),
        },
        authorName: {
          type: `String`,
        },
        authorId: {
          type: `String`,
        },
        authorAvatar: {
          type: `File`,
        },
      },
      interfaces: [`Node`, `Item`],
      extensions: {
        infer: false,
      },
    })
  )
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

function processRelativeImage(source, context, type) {
  // Image is a relative path - find a corresponding file
  const mdxFileNode = context.nodeModel.findRootNodeAncestor(
    source,
    (node) => node.internal && node.internal.type === `File`
  )
  if (!mdxFileNode) {
    return
  }
  const imagePath = slash(path.join(mdxFileNode.dir, source[type]))

  const fileNodes = context.nodeModel.getAllNodes({ type: `File` })
  for (const file of fileNodes) {
    if (file.absolutePath === imagePath) {
      return file
    }
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

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, getNode, createNodeId, store, cache },
  themeOptions
) => {
  const { createNode, createParentChildLink } = actions
  const {
    contentPath,
    basePath,
    tweetTypeName,
    dataPath,
    shouldTransformMdx,
    shouldTransformTweet,
  } = withDefaults(themeOptions)

  // Make sure it's an MDX node
  if (!(node.internal.type === `Mdx` || node.internal.type === tweetTypeName)) {
    return
  }
  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (
    shouldTransformMdx &&
    node.internal.type === `Mdx` &&
    source === contentPath
  ) {
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
      socialImage: node.frontmatter.socialImage,
    }

    if (validURL(node.frontmatter.image)) {
      // create a file node for image URLs
      const remoteFileNode = await createRemoteFileNode({
        url: node.frontmatter.image,
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

    if (validURL(node.frontmatter.socialImage)) {
      // create a file node for image URLs
      const remoteFileNode = await createRemoteFileNode({
        url: node.frontmatter.socialImage,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store,
      })
      // if the file was created, attach the new node to the parent node
      if (remoteFileNode) {
        fieldData.socialImage___NODE = remoteFileNode.id
      }
    }

    const MdxPostId = createNodeId(`${node.id} >>> ${POST_TYPE_NAME}`)

    await createNode({
      ...fieldData,
      // Required fields.
      id: MdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: POST_TYPE_NAME,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Item interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(MdxPostId) })
  }
  if (
    shouldTransformTweet &&
    node.internal.type === tweetTypeName &&
    source === dataPath
  ) {
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
    // add tag
    fieldData.tags.push(`tweet`)

    // get author avatar
    if (validURL(node.user.profile_image_url_https)) {
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

// These templates are simply data-fetching wrappers that import components
const ItemTemplate = require.resolve(`./src/templates/detail-query`)
const ItemsTemplate = require.resolve(`./src/templates/items-query`)
const TagItemsTemplate = require.resolve(`./src/templates/tag-items-query`)
exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions
  const { basePath, imageMaxWidth, postsPerPage } = withDefaults(themeOptions)

  const result = await graphql(`
    {
      allItem(sort: { fields: [date, slug], order: DESC }) {
        nodes {
          id
          slug
        }
      }
      tagsGroup: allItem(sort: { fields: [date, slug], order: DESC }) {
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
  const { allItem } = result.data
  const posts = allItem.nodes
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

  // Create a page for each Post
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    const { slug } = post
    createPage({
      path: slug,
      component: ItemTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.id : undefined,
        nextId: next ? next.id : undefined,
        maxWidth: imageMaxWidth,
      },
    })
  })
}
