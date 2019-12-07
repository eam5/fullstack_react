import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const findName = persons.some(element => element.name === newName )
  console.log(findName)

  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName,
          number: newNumber,
      }

      const numberConfirm = id => {
        const name = persons.find(n => n.name === newName)
        const updateNumber = { ...name, number: newNumber}
        console.log(name)
        
        if (window.confirm(`${newName} is already in the phonebook, replace number?`)) {
          personService
              .update(name.id, updateNumber)
              .then(returnedNumber => {
                setPersons(persons.map(name => name.id !==id ? name : returnedNumber))
                setErrorMessage(
                  `${newName}'s phone number was updated to ${newNumber}`
                )
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
  
              })
        }
      }

      const showAlert = (condition) => {
        condition
        ? numberConfirm()
        : personService.create(nameObject).then(data => {
              setPersons(persons.concat(data))
              setErrorMessage(
                `${newName} was added to the Phonebook`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
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

  const deleteNameOf = id => {
    const person = persons.find(n => n.id === id)
    console.log(person)

    if
    (window.confirm(`Delete ${person.name} from Phonebook?`)) {
      personService 
      .handleDelete(id)
      .then(setPersons(persons.filter(n => n.id !== id)))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
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
      <Contacts 
        list={persons} 
        searchTerm={searchTerm} 
        deleteNameOf={deleteNameOf}
      />
    </div>
  )
}

export default App