import { Form } from "react-bootstrap"

type Props = {
  onLikedTweetsToggle: React.ChangeEventHandler<HTMLInputElement>
  toggleLikedTweets: boolean
  onClearTweets: React.MouseEventHandler<HTMLElement>
  likedTweetsCount: number
}

const Header = ({
  onLikedTweetsToggle,
  toggleLikedTweets,
  onClearTweets,
  likedTweetsCount
}: Props) => {
  return (
    <header className="p-2 bg-dark text-white">
      <div className="d-flex p-1">
        <div className="p-2 ">
          <Form>
            {/** can create a custon component which takes label callback and emits internal state */}
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Display Liked Tweets Only"
              onChange={onLikedTweetsToggle}
              checked={toggleLikedTweets}
              role="button"
            />
          </Form>
        </div>
        <div className="p-2" role="button" onClick={onClearTweets}>
          Clear all Tweets
        </div>
        <div className="p-2" style={{ marginLeft: "auto" }}>
          Liked Tweets {likedTweetsCount}
        </div>
      </div>
    </header>
  )
}

export default Header
