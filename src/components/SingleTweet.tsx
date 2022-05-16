import { useCallback } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { Tweet } from "../interface/common"
import HeartIcon from "./icons/Heart"

type Props = {
  tweet: Tweet
  onLike: Function
}

const SingleTweet = ({ tweet, onLike }: Props) => {
  const handleTweetClick = useCallback(() => {
    onLike(tweet)
  }, [tweet, onLike])

  return (
    <Card
      className={`mb-1 ${tweet.liked ? "text-danger" : "text-secondary"}`}
      key={tweet.id}
    >
      <Card.Body>
        <Card.Title>{tweet.account}</Card.Title>
        <Card.Text>{tweet.content} </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row onClick={handleTweetClick}>
          <Col style={{ cursor: "pointer" }}>
            <button
              type="button"
              className={`btn btn-sm ml-2 ${
                tweet.liked ? "btn-danger" : "btn-outline-danger"
              }`}
            >
              <HeartIcon liked={tweet.liked} />
            </button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default SingleTweet
