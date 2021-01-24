import React from "react"
import {
  TWEET_TYPE_NAME,
  REDDIT_TYPE_NAME,
  HN_TYPE_NAME,
  PH_TYPE_NAME,
  REDIRECT_TYPE_NAME,
  YOUTUBE_TYPE_NAME,
  SOCIAL_MEDIA_TYPE_NAME,
  INSTAGRAM_TYPE_NAME,
} from "../constans"
import PostItem from "./post/item"
import TweetItem from "./tweet/item"
import RedditItem from "./reddit/item"
import HnItem from "./hn/item"
import PhItem from "./ph/item"
import RedirectItem from "./redirect/item"
import YoutubeItem from "./youtube/item"
import InstagramItem from "./instagram/item"
const Item = (props) => {
  const { item } = props
  if (item.__typename === SOCIAL_MEDIA_TYPE_NAME) {
    const provider = item.provider
    if (provider === TWEET_TYPE_NAME) {
      return <TweetItem {...props}></TweetItem>
    } else if (provider === REDDIT_TYPE_NAME) {
      return <RedditItem {...props}></RedditItem>
    } else if (provider === HN_TYPE_NAME) {
      return <HnItem {...props}></HnItem>
    } else if (provider === PH_TYPE_NAME) {
      return <PhItem {...props}></PhItem>
    } else if (provider === REDIRECT_TYPE_NAME) {
      return <RedirectItem {...props}></RedirectItem>
    } else if (provider === YOUTUBE_TYPE_NAME) {
      return <YoutubeItem {...props}></YoutubeItem>
    } else if (provider === INSTAGRAM_TYPE_NAME) {
      return <InstagramItem {...props}></InstagramItem>
    }
  }
  return <PostItem {...props}></PostItem>
}

export default Item
