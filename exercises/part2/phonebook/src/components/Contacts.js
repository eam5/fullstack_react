import React from 'react'

const Contacts = ({list, deleteNameOf }) => {

  return (
    <div>
    {list.name}, {list.number}
    <button onClick={deleteNameOf}>delete</button>
    </div>

  )
}


// const Contacts = ({list, searchTerm, deleteNameOf }) => {
//     const rows = () => list
//       .filter(list => 
//         list.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       .map(list =>
//         <div key={list.name}>
//           {list.name}, {list.number}
//           <button onClick={() => deleteNameOf(list.id)}>delete</button>
//         </div>
//       )

//     return (
//         <div>{rows()}</div>
//     )
// }

export default Contacts