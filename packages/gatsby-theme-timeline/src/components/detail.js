import React from "react"
import { TWEET_TYPE_NAME } from "../constans"
import PostDetail from "./post/detail"
import TweetDetail from "./tweet/detail"
const Detail = (detail) => {
  if (detail.__typename === TWEET_TYPE_NAME) {
    return <TweetDetail {...detail}></TweetDetail>
  }
  return <PostDetail {...detail}></PostDetail>
}

export default Detail
