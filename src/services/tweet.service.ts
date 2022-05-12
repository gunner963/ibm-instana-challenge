import { useEffect, useRef, useState } from "react"
import { Subscription, timestamp } from "rxjs"
import { tweets as tweets$ } from "./dataSource"

const DELETE_OLD_TWEET_FREQUENCY = 30000

export interface Tweet {
  account: string
  timestamp: number
  content: string
  liked: boolean
}

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
                (tweet) => timestamp - tweet.timestamp < 30000
              )
              return [{ ...value, liked: false }, ...recentlyFilteredTweets]
            }
            return [{ ...value, liked: false }]
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
