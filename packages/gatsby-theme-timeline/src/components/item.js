import React from "react"
import { TWEET_TYPE_NAME } from "../constans"
import PostItem from "./post/item"
import TweetItem from "./tweet/item"
const Item = (node) => {
  if (node.__typename === TWEET_TYPE_NAME) {
    return <TweetItem {...node}></TweetItem>
  }
  return <PostItem {...node}></PostItem>
}

export default Item
