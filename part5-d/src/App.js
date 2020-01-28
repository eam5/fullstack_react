import React, { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const App = () => {
  const name = useField('text')
  const date = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name: 
        <input {...name} />
        {/* <input
          type= {name.type}
          value={name.value}
          onChange={name.onChange} 
        />  */}
        <br/> 
        birthdate:
        <input {...date} /> 
        <br /> 
        height:
        <input {...height} /> 
      </form>
      <div>
        {name.value}  {date.value} {height.value}
      </div>
    </div>
  )
}

//this is a custom hook, must begin with 'use'
// const useCounter = () => {
//   const [value, setValue] = useState(0)

//   const increase = () => {
//     setValue(value + 1)
//   }

//   const decrease = () => {
//     setValue(value - 1)
//   }

//   const zero = () => {
//     setValue(0)
//   }

//   return {
//     value, 
//     increase,
//     decrease,
//     zero
//   }
// }

// const App = () => {
//   const left = useCounter()
//   const right = useCounter()

//   return (
//     <div>
//       {left.value}
//       <button onClick={left.increase}>
//         left
//       </button>
//       <button onClick={right.increase}>
//         right
//       </button>
//       {right.value}
//     </div>
//   )
// }

// const App = (props) => {
//   const counter = useCounter()

//   return (
//     <div>
//       <div>{counter.value}</div>
//       <button onClick={counter.increase}>
//         plus
//       </button>
//       <button onClick={counter.decrease}>
//         minus
//       </button>      
//       <button onClick={counter.zero}>
//         zero
//       </button>
//     </div>
//   )
// }

export default App;
