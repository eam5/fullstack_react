import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Contacts from './components/Contacts'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const findName = persons.some(element => element.name === newName )

  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName,
          number: newNumber,
      }
      const showAlert = (condition) => {
        condition
        ? window.alert(newName + ' is already in the phonebook')
        : personService.create(nameObject).then(data => {
          setPersons(persons.concat(data))
        })
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
      <Contacts list={persons} searchTerm={searchTerm}/>
    </div>
  )
}

export default App