import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"
import { useTweets } from "./services/tweet.service"

jest.mock("./services/tweet.service")

test("should render header and static alert component given there are no tweets", () => {
  ;(useTweets as jest.Mock).mockReturnValueOnce([])
  render(<App />)
  const header = screen.queryByTestId("header")
  const alert = screen.getByText(/no tweets to display/i)
  const tweet = screen.queryByTestId("twitter")
  expect(header).toBeInTheDocument()
  expect(alert).toBeInTheDocument()
  expect(tweet).not.toBeInTheDocument()
})

test("should display normal tweet component when tweets are received", () => {
  ;(useTweets as jest.Mock).mockReturnValueOnce([
    [
      {
        id: "iamuser",
        account: "hello",
        timestamp: 123332,
        content: "abc",
        liked: false
      }
    ],
    null,
    null
  ])
})
