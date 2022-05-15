import { Container, Form } from "react-bootstrap"

type Props = {
  onLikedTweetsToggle: React.ChangeEventHandler<HTMLInputElement>
  toggleLikedTweets: boolean
  onClearTweets: React.MouseEventHandler<HTMLElement>
}

const Header = ({
  onLikedTweetsToggle,
  toggleLikedTweets,
  onClearTweets
}: Props) => {
  return (
    <header className="p-3 bg-dark text-white">
      <Container>
        <div className="d-flex">
          <div className="mr-auto p-3">Twitter</div>
          <div className="p-3 ">
            <Form>
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
          <div className="p-3" role="button" onClick={onClearTweets}>
            Clear all Tweets
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
