import React from "react"
import {
  TWEET_TYPE_NAME,
  REDDIT_TYPE_NAME,
  HN_TYPE_NAME,
  PH_TYPE_NAME,
  REDIRECT_TYPE_NAME,
  YOUTUBE_TYPE_NAME,
} from "../constans"
import PostItem from "./post/item"
import TweetItem from "./tweet/item"
import RedditItem from "./reddit/item"
import HnItem from "./hn/item"
import PhItem from "./ph/item"
import RedirectItem from "./redirect/item"
import YoutubeItem from "./youtube/item"
const Item = (props) => {
  const { item } = props
  if (item.__typename === TWEET_TYPE_NAME) {
    return <TweetItem {...props}></TweetItem>
  } else if (item.__typename === REDDIT_TYPE_NAME) {
    return <RedditItem {...props}></RedditItem>
  } else if (item.__typename === HN_TYPE_NAME) {
    return <HnItem {...props}></HnItem>
  } else if (item.__typename === PH_TYPE_NAME) {
    return <PhItem {...props}></PhItem>
  } else if (item.__typename === REDIRECT_TYPE_NAME) {
    return <RedirectItem {...props}></RedirectItem>
  } else if (item.__typename === YOUTUBE_TYPE_NAME) {
    return <YoutubeItem {...props}></YoutubeItem>
  }
  return <PostItem {...props}></PostItem>
}

export default Item
