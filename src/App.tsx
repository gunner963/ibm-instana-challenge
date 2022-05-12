import React, { useEffect, useState } from "react"
import "./App.css"
import { Tweet, useTweets } from "./services/tweet.service"
import { Row } from "react-bootstrap"

function App() {
  const [tweets, setTweets, setReceiveTweets] = useTweets()
  const [likedTweets, setLikedTweets] = useState<null | Tweet[]>(null)

  const handleLike = (tweet: Tweet) => {
    const updatedTweet: Tweet = {
      ...tweet,
      liked: !tweet.liked
    }
    if (tweets) {
      const newTweets = tweets.map((tweet) => {
        if (tweet.content === updatedTweet.content) {
          return updatedTweet
        } else return tweet
      })
      setTweets(newTweets)
    }
  }

  useEffect(() => {
    if (tweets) {
      const likedTweets = tweets.filter((tweet) => tweet.liked)
      setLikedTweets(likedTweets)
    }
  }, [tweets])
  return (
    <div className="App">
      {tweets &&
        tweets.map((tweet) => (
          <Row key={tweet.content} onClick={() => handleLike(tweet)}>
            {tweet.content} {tweet.liked ? "Liked" : "Not Liked"}
          </Row>
        ))}
    </div>
  )
}

export default App
