import React from "react"
import { TWEET_TYPE_NAME, REDDIT_TYPE_NAME } from "../constans"
import PostDetail from "./post/detail"
import TweetDetail from "./tweet/detail"
import RedditDetail from "./reddit/detail"
const Detail = (detail) => {
  if (detail.__typename === TWEET_TYPE_NAME) {
    return <TweetDetail {...detail}></TweetDetail>
  } else if (detail.__typename === REDDIT_TYPE_NAME) {
    return <RedditDetail {...detail}></RedditDetail>
  }
  return <PostDetail {...detail}></PostDetail>
}

export default Detail
