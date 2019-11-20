import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const Statistic = (props) => {
    if (props.text === "positive") {
        return (
            <p>{props.text}: {props.value}%</p>
        )    
    }
    return (
        <p>{props.text}: {props.value}</p>
    )
}


const Statistics = (props) => {
    if (props.all === 0) {
        return (
        <p>no feedback given</p>
        )
    }
    return (
    <div>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="all" value={props.all} />
        <Statistic text="average" value={props.result} />
        <Statistic text="positive" value={props.percentGood} />
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
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text ='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>stats</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} result={result} percentGood={percentGood} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)