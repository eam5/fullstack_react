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

const Display = ({ counter }) => {
    return (
        <div>{counter}</div>
    )
}

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const App = (props) => {
    const name = 'Mark'
    const age = 40
    const [ counter, setCounter ] = useState(0)
    const setToValue = (value) => setCounter(value)
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

        <Display counter={counter}/>
        <Button onClick={() => setToValue(counter + 1)} text='plus' />
        <Button onClick={() => setToValue(0)} text='zero' />
        <Button onClick={() => setToValue(counter - 1)} text='minus' />
    </>
) }


ReactDOM.render(<App />, document.getElementById('root'))

