import { Tweet } from "../services/tweet.service"
import SingleTweet from "./SingleTweet"

type Props = {
  tweets: Tweet[]
  onLike: Function
}

const Twitter = ({ tweets, onLike }: Props) => {
  return (
    <>
      {tweets.map((tweet) => (
        <SingleTweet tweet={tweet} key={tweet.id} onLike={onLike} />
      ))}
    </>
  )
}

export default Twitter
