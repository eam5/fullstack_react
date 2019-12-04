import React from 'react'

const Contacts = ({list, searchTerm}) => {
    const rows = () => list
      .filter(list => 
        list.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      .map(list =>
        <div key={list.name}>{list.name}, {list.number}</div>
      )

    return (
        <div>{rows()}</div>
    )
}

export default Contacts