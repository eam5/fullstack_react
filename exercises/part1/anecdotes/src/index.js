import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Vote = (props) => (
  <div>has {props.points[props.index]} votes</div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, upVote] = useState(new Array(props.anecdotes.length).fill(0))
  console.log(selected)
  console.log(points)

  const vote = (index) => {
    // Make a copy of the state array here
    const copy = [...points]
    // Update the value of the copy here
    copy[index] += 1
    // Then send that copy to the state's update function.
    // This function (specified up there on line 10) sets the value of the state variable (in this case 'points') to
    // the value passed to the function ('upVote'). So the trick is to make a copy of the array, update the copy, then
    // send the copy to the update function and that array is then set as the state 
    upVote(copy)
    console.log(copy)
}

console.log('most points:', points.indexOf(Math.max(...points)));
  
  return (
    <div>
      <h2>anecdote</h2>
      {props.anecdotes[selected]}
      <Vote index={selected} points={points} />
      <div>
        <button onClick={() => vote(selected) }>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * Math.floor(props.anecdotes.length)))}>next anecdotes</button>
      </div>
      <h2>most votes</h2>
      {props.anecdotes[points.indexOf(Math.max(...points))]}
      <div>has {Math.max(...points)} points</div>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)