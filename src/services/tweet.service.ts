import { useEffect, useRef, useState } from "react"
import { Subscription, timestamp } from "rxjs"
import { Tweet } from "../interface/common"
import { tweets as tweets$ } from "./dataSource"

const DELETE_OLD_TWEET_FREQUENCY = 30000

export const useTweets = () => {
  const twitterSubscription = useRef<Subscription | null>(null)
  const [tweets, setTweets] = useState<Tweet[] | null>(null)
  const [receiveTweets, setReceiveTweets] = useState<boolean>(true)
  useEffect(() => {
    if (receiveTweets) {
      twitterSubscription.current = tweets$
        .pipe(timestamp())
        .subscribe(({ value, timestamp }) => {
          setTweets((tweets) => {
            if (Array.isArray(tweets)) {
              const recentlyFilteredTweets = tweets.filter(
                (tweet) =>
                  timestamp - tweet.timestamp < DELETE_OLD_TWEET_FREQUENCY
              )
              return [
                { ...value, liked: false, id: value.account + value.timestamp },
                ...recentlyFilteredTweets
              ]
            }
            return [
              { ...value, liked: false, id: value.account + value.timestamp }
            ]
          })
        })
    } else if (!receiveTweets) {
      twitterSubscription.current?.unsubscribe()
      setTweets(null)
    }
    return () => twitterSubscription.current?.unsubscribe()
  }, [receiveTweets])
  return [tweets, setTweets, setReceiveTweets] as const
}
