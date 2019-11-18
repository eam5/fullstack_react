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

    const setToValue = (value) => () => {setCounter(value)}
    //Using the above setToValue 'double function' not necessarily better than below functions, just example of currying techinque

    // const increaseByOne = () =>
    //     setCounter(counter + 1)

    // const setToZero = () =>
    //     setCounter(0)
    
    return ( 
    <>
        <h1>Greetings</h1>
        <Hello name="Gerard" age={21+14}/>
        <Hello name={name} age={age}/>

        <div>{counter}</div>
        <button onClick={setToValue(counter + 1)}>plus</button>
        <button onClick={setToValue(0)}>zero</button>
    </>
) }


ReactDOM.render(<App />, document.getElementById('root'))

