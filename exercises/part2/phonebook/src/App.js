import React, { useState } from 'react'

const Name = ({list}) => {
    return (
    <div>{list.name}</div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [showAlert,setShowAlert] = useState(true)
  console.log(showAlert)

  const rows = () => persons.map(list =>
    <Name
        key={list.id}
        list={list}
    />)
  
  const findName = persons.some(element => element.name === newName )
  console.log(findName)

  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName,
          id: persons.length + 1,
      }
      const nameAlert = findName
        ? window.alert(newName + ' is already in the phonebook')
        : setPersons(persons.concat(nameObject))
      
    setShowAlert(nameAlert)
    setNewName('')
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}

export default App