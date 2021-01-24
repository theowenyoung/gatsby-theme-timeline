import React from "react"
import {
  TWEET_TYPE_NAME,
  REDDIT_TYPE_NAME,
  POST_TYPE_NAME,
  HN_TYPE_NAME,
  PH_TYPE_NAME,
  REDIRECT_TYPE_NAME,
  YOUTUBE_TYPE_NAME,
  SOCIAL_MEDIA_TYPE_NAME,
  INSTAGRAM_TYPE_NAME,
} from "../constans"
import PostDetail from "./post/detail"
import TweetDetail from "./tweet/detail"
import RedditDetail from "./reddit/detail"
import HNDetail from "./hn/detail"
import DefaultDetail from "./detail-default"
import PHDetail from "./ph/detail"
import RedirectDetail from "./redirect/detail"
import YoutubeDetail from "./youtube/detail"
import InstagramDetail from "./instagram/detail"
const Detail = (props) => {
  const { item } = props
  if (item.__typename === SOCIAL_MEDIA_TYPE_NAME) {
    const provider = item.provider
    if (provider === TWEET_TYPE_NAME) {
      return <TweetDetail {...props}></TweetDetail>
    } else if (provider === REDDIT_TYPE_NAME) {
      return <RedditDetail {...props}></RedditDetail>
    } else if (provider === HN_TYPE_NAME) {
      return <HNDetail {...props}></HNDetail>
    } else if (provider === PH_TYPE_NAME) {
      return <PHDetail {...props}></PHDetail>
    } else if (provider === REDIRECT_TYPE_NAME) {
      return <RedirectDetail {...props}></RedirectDetail>
    } else if (provider === YOUTUBE_TYPE_NAME) {
      return <YoutubeDetail {...props}></YoutubeDetail>
    } else if (provider === INSTAGRAM_TYPE_NAME) {
      return <InstagramDetail {...props}></InstagramDetail>
    } else {
      return <DefaultDetail {...props}></DefaultDetail>
    }
  } else if (item.__typename === POST_TYPE_NAME) {
    return <PostDetail {...props}></PostDetail>
  } else {
    return <DefaultDetail {...props}></DefaultDetail>
  }
}

export default Detail
