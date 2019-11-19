import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    return (
    <div>
        <h1>stats</h1>
        <p>good: {props.good}</p>
        <p>neutral: {props.neutral}</p>
        <p>bad: {props.bad}</p>
        <p>all: {props.all}</p>
        <p>average: {props.result}</p>
        <p>positive: {props.percentGood}%</p>
    </div>
    )
  }

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = (p1, p2, p3) => {
    return p1 + p2 + p3
  }
  const all = sum(good, neutral, bad)
  const average = (a, b, c, d) => {
      console.log(a)
      console.log(b)
      console.log(c)
    return (a + b + c) / d
  }
  const result = average(good*1, neutral*0, bad*-1, all)
  const percent = (g, a) => {
      return (g / a) * 100
  }
  const percentGood = percent(good,all)


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} result={result} percentGood={percentGood} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)