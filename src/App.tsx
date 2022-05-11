import React, { useEffect, useRef, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import { tweets as tweet$ } from "./services/dataSource"
import {
  map,
  timer,
  timestamp,
  of,
  mergeMap,
  interval,
  filter,
  ConnectableObservable
} from "rxjs"

interface Tweet {
  account: string
  timestamp: number
  content: string
}

function App() {
  const [tweets, setTweets] = useState<null | Tweet[]>(null)
  const arr = tweet$.pipe(map((val: Tweet) => [val]))
  const subscriptionRef: any = useRef(null)
  const obser = of(tweets).pipe(
    mergeMap((tweet) =>
      timer(0, 5000).pipe(
        timestamp(),
        map((val) => {
          return { tweet, val }
        })
      )
    )
  )
  const newObs = of(tweets).pipe(
    mergeMap((tweets) =>
      interval(1000).pipe(
        timestamp(),
        map((timestampObj) => {
          const filteredTweets = tweets?.filter(
            (tweet) => timestampObj.timestamp - tweet.timestamp < 30000
          )
          return filteredTweets
        })
        // filter(val => ) // may be can use filter and do some chaining ?
      )
    )
  )
  // useEffect(() => {
  //   subscriptionRef.current = tweet$.subscribe((tweet) => {
  //     setTweets((tweets) => {
  //       if (Array.isArray(tweets)) {
  //         const newTweets = [tweet, ...tweets]
  //         return newTweets
  //       }
  //       return [tweet]
  //     })
  //   })
  //   return () => subscriptionRef.current.unsubscribe()
  // }, [])

  useEffect(() => {
    subscriptionRef.current = tweet$
      .pipe(map((val: Tweet) => [val]))
      .subscribe((tweet) => {
        setTweets((tweets) => {
          if (Array.isArray(tweets)) {
            return [...tweet, ...tweets]
          }
          return tweet
        })
      })
    return () => subscriptionRef.current.unsubscribe()
  }, [])

  useEffect(() => {
    const sub = newObs.subscribe((data) => console.log(data))
    return () => sub.unsubscribe()
  }, [newObs])

  useEffect(() => {
    // setTimeout(() => {
    //   subscriptionRef.current.unsubscribe()
    // }, 10000)
  }, [])

  // console.log(tweets)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
