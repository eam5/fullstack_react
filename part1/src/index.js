import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const Display = (props) => (
    <div>{props.value}</div>
)

const App = (props) => {
    const [value, setValue] = useState(10)

    const setToValue = (newValue) =>  {
        console.log(newValue)
        setValue(newValue)
    }

    return (
        <div>
            <Display value={value} />
            <Button handleClick={() => setToValue(0)} text='reset' />
            <Button handleClick={() => setToValue(1000)} text='1000' />
            <Button handleClick={() => setToValue(value + 1)} text='add' />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))

