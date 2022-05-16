import React, { useCallback, useEffect, useState } from "react"
import "./App.css"
import { useTweets } from "./services/tweet.service"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Twitter from "./components/Twitter"
import StaticAlert from "./components/StaticAlert"
import { Tweet } from "./interface/common"

function App() {
  const [tweets, setTweets, setReceiveTweets] = useTweets()
  const [likedTweets, setLikedTweets] = useState<null | Tweet[]>(null)
  const [showLikedTweets, setShowLikedTweets] = useState(false)

  const handleShowLikedTweets = useCallback(
    () => setShowLikedTweets(!showLikedTweets),
    [showLikedTweets]
  )

  const handleLike = useCallback(
    (tweet: Tweet) => {
      const updatedTweet: Tweet = {
        ...tweet,
        liked: !tweet.liked
      }
      if (tweets) {
        const newTweets = tweets.map((tweet) => {
          if (tweet.id === updatedTweet.id) {
            return updatedTweet
          } else return tweet
        })
        setTweets(newTweets)
      }
    },
    [tweets, setTweets]
  )

  useEffect(() => {
    if (tweets) {
      const likedTweets = tweets.filter((tweet) => tweet.liked)
      setLikedTweets(likedTweets)
    } else setLikedTweets(null)
  }, [tweets])

  const handleClearTweets = useCallback(() => {
    setReceiveTweets(false)
  }, [setReceiveTweets])

  return (
    <div>
      <Header
        onShowLikedTweets={handleShowLikedTweets}
        onClearTweets={handleClearTweets}
        toggleLikedTweets={showLikedTweets}
        likedTweetsCount={likedTweets?.length || 0}
      />
      <br />
      <Container>
        {showLikedTweets && likedTweets ? (
          <Twitter tweets={likedTweets} onLike={handleLike} />
        ) : null}
        {!showLikedTweets && tweets ? (
          <Twitter tweets={tweets} onLike={handleLike} />
        ) : null}

        {!tweets && !likedTweets && (
          <StaticAlert alertText="No Tweets To Display !" />
        )}
      </Container>
    </div>
  )
}

export default App
