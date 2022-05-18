import { Tweet } from "../interface/common"
import SingleTweet from "./SingleTweet"

type Props = {
  tweets: Tweet[]
  onLike: Function
}

const Twitter = ({ tweets, onLike }: Props) => {
  return (
    <div data-testid="twitter">
      {tweets.map((tweet) => (
        <SingleTweet tweet={tweet} key={tweet.id} onLike={onLike} />
      ))}
    </div>
  )
}

export default Twitter
