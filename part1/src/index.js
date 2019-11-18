import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const Hello = ({ name,age }) => {
    const bornYear = () => new Date().getFullYear() - age

    return (
    <div>
    <p>Hello {name}, you are {age} years old</p>
    <p>So you were probably born in {bornYear()}</p>
    </div>
    )
}

const App = (props) => {
    const name = 'Mark'
    const age = 40
    const [ counter, setCounter ] = useState(0)
    setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    return ( 
    <>
        <h1>Greetings</h1>
        <Hello name="Gerard" age={21+14}/>
        <Hello name={name} age={age}/>

        <div>{counter}</div>
    </>
) }


ReactDOM.render(<App />, document.getElementById('root'))

