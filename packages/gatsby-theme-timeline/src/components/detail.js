import React from "react"
import {
  TWEET_TYPE_NAME,
  REDDIT_TYPE_NAME,
  POST_TYPE_NAME,
  HN_TYPE_NAME,
  PH_TYPE_NAME,
  REDIRECT_TYPE_NAME,
  YOUTUBE_TYPE_NAME,
} from "../constans"
import PostDetail from "./post/detail"
import TweetDetail from "./tweet/detail"
import RedditDetail from "./reddit/detail"
import HNDetail from "./hn/detail"
import DefaultDetail from "./detail-default"
import PHDetail from "./ph/detail"
import RedirectDetail from "./redirect/detail"
import YoutubeDetail from "./youtube/detail"
const Detail = (props) => {
  const { item } = props
  if (item.__typename === TWEET_TYPE_NAME) {
    return <TweetDetail {...props}></TweetDetail>
  } else if (item.__typename === REDDIT_TYPE_NAME) {
    return <RedditDetail {...props}></RedditDetail>
  } else if (item.__typename === HN_TYPE_NAME) {
    return <HNDetail {...props}></HNDetail>
  } else if (item.__typename === POST_TYPE_NAME) {
    return <PostDetail {...props}></PostDetail>
  } else if (item.__typename === PH_TYPE_NAME) {
    return <PHDetail {...props}></PHDetail>
  } else if (item.__typename === REDIRECT_TYPE_NAME) {
    return <RedirectDetail {...props}></RedirectDetail>
  } else if (item.__typename === YOUTUBE_TYPE_NAME) {
    return <YoutubeDetail {...props}></YoutubeDetail>
  } else {
    return <DefaultDetail {...props}></DefaultDetail>
  }
}

export default Detail
