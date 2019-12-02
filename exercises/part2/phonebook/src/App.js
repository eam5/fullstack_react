import React, { useState } from 'react'

const Name = ({list}) => {
    return (
    <div>{list.name}</div>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  console.log(persons)

  const rows = () => persons.map(list =>
    <Name
        key={list.id}
        list={list}
    />)

  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName,
          id: persons.length + 1,
      }
    setPersons(persons.concat(nameObject))
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