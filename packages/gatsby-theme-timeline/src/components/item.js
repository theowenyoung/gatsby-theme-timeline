import React from "react"
import { TWEET_TYPE_NAME, REDDIT_TYPE_NAME } from "../constans"
import PostItem from "./post/item"
import TweetItem from "./tweet/item"
import RedditItem from "./reddit/item"

const Item = (node) => {
  if (node.__typename === TWEET_TYPE_NAME) {
    return <TweetItem {...node}></TweetItem>
  } else if (node.__typename === REDDIT_TYPE_NAME) {
    return <RedditItem {...node}></RedditItem>
  }
  return <PostItem {...node}></PostItem>
}

export default Item
