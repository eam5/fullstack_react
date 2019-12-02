import React, { useState } from 'react'

const Name = ({list}) => {
    return (
<div>{list.name}, {list.number}</div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAlert,setShowAlert] = useState(true)
  console.log(showAlert)

  const rows = () => persons.filter(filterBy(searchTerm)).map(list =>
    <Name
        key={list.name}
        list={list}
    />)
  
  const findName = persons.some(element => element.name === newName )
  // console.log(findName)

  const filterBy = (term) => {
    const termLowerCase = term.toLowerCase()
    return (person) =>
      Object.keys(person)
        .some(prop => person[prop].toLowerCase().indexOf(termLowerCase) !== -1)
  }
  
  // const found = persons.filter(filterBy(searchTerm))
  // console.log(found)

  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName,
          number: newNumber,
      }
      const nameAlert = findName
        ? window.alert(newName + ' is already in the phonebook')
        : setPersons(persons.concat(nameObject))
      
    setShowAlert(nameAlert)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter contacts: <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      <h2>Add new contact</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
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