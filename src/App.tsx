import React, { useCallback, useEffect, useState } from "react"
import "./App.css"
import { Tweet, useTweets } from "./services/tweet.service"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Twitter from "./components/Twitter"
import StaticAlert from "./components/StaticAlert"

function App() {
  const [tweets, setTweets, setReceiveTweets] = useTweets()
  const [likedTweets, setLikedTweets] = useState<null | Tweet[]>(null)
  const [toggleLikedTweets, setToggleLikedTweets] = useState(false)

  const handleLikedTweetsToggle = useCallback(
    () => setToggleLikedTweets(!toggleLikedTweets),
    [toggleLikedTweets]
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
        onLikedTweetsToggle={handleLikedTweetsToggle}
        onClearTweets={handleClearTweets}
        toggleLikedTweets={toggleLikedTweets}
      />
      <br />
      <Container>
        {tweets && !toggleLikedTweets ? (
          <Twitter tweets={tweets} onLike={handleLike} />
        ) : likedTweets && toggleLikedTweets ? (
          <Twitter tweets={likedTweets} onLike={handleLike} />
        ) : (
          <StaticAlert alertText="No Tweets To Display !" />
        )}
      </Container>
    </div>
  )
}

export default App
