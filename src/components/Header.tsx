import { Form } from "react-bootstrap"

type Props = {
  onShowLikedTweets: React.ChangeEventHandler<HTMLInputElement>
  toggleLikedTweets: boolean
  onClearTweets: React.MouseEventHandler<HTMLElement>
  likedTweetsCount: number
}

const Header = ({
  onShowLikedTweets,
  toggleLikedTweets,
  onClearTweets,
  likedTweetsCount
}: Props) => {
  return (
    <header className="p-2 bg-dark text-white" data-testid="header">
      <div className="d-flex justify-content-center">
        <p className="h3">Twitter</p>
      </div>
      <div className="d-flex p-1">
        <div className="p-2 ">
          <Form>
            {/** can create a custon component which takes label callback and emits internal state */}
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Display Liked Tweets Only"
              onChange={onShowLikedTweets}
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
