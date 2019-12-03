import React from 'react'

const Contacts = ({list, searchTerm}) => {
    const rows = () => list.filter(filterBy(searchTerm)).map(list =>
    <div key={list.name}>{list.name}, {list.number}</div>
    )

    const filterBy = (term) => {
        const termLowerCase = term.toLowerCase()
        return (person) =>
          Object.keys(person)
            .some(prop => person[prop].toLowerCase().indexOf(termLowerCase) !== -1)
      }
    
    return (
        <div>{rows()}</div>
    )
}

export default Contacts