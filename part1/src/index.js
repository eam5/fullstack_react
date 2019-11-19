import React, { useState} from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
    const [value, setValue] = useState(10)

    //event handler examples
    const handleClick = () => {
        console.log('clicked button')
        setValue(0)
    }
//function calling function examples
    const setToValue = (newValue) => ()=> {
        setValue(newValue)
    }

    const setToValue2 = (newValue2) => {
        setValue(newValue2)
    }

    return (
        <div>
            {value}
            <button onClick={handleClick}>reset to zero</button>
            <button onClick={setToValue(1000)}>1000</button>
            <button onClick={() => setToValue2(100)}>100</button>
            <button onClick={setToValue(value + 1)}>add 1</button>

        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))

