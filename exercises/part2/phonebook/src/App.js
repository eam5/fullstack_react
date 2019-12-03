import React, { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const rows = () => persons.filter(filterBy(searchTerm)).map(list =>
    <Contacts
        key={list.name}
        list={list}
    />)
  
  const findName = persons.some(element => element.name === newName )

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
      const showAlert = (condition) => {
        condition
        ? window.alert(newName + ' is already in the phonebook')
        : setPersons(persons.concat(nameObject))
      }

    showAlert(findName)
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
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
      <h2>Add new contact</h2>
      <Form 
        newName={newName} 
        newNumber={newNumber} 
        addName={addName} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      {rows()}
      {/* <Contacts contacts={persons} /> */}
    </div>
  )
}

export default App