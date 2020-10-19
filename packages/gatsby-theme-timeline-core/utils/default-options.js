module.exports = (themeOptions) => {
  const basePath = `/`
  const contentPath = `content/posts`
  const assetPath = `content/assets`
  const dataPath = `data`
  const tweetTypeName = `TweetsJson`
  const excerptLength = 140
  const imageMaxWidth = 1024
  const shouldTransformMdx = true
  const shouldTransformTweet = true
  const postsPerPage = 15
  const jsonTransformerOptions = {
    typeName: ({ node }) => {
      const rootDirectoryName = node.relativeDirectory.split(`/`)[0]
      const rootDirectoryNameCapitalized =
        rootDirectoryName.charAt(0).toUpperCase() + rootDirectoryName.slice(1)
      return `${rootDirectoryNameCapitalized}Json`
    },
  }
  return {
    basePath,
    contentPath,
    dataPath,
    assetPath,
    excerptLength,
    imageMaxWidth,
    tweetTypeName,
    shouldTransformMdx,
    shouldTransformTweet,
    postsPerPage,
    ...themeOptions,
    jsonTransformerOptions: {
      ...jsonTransformerOptions,
      ...themeOptions.jsonTransformerOptions,
    },
  }
}
