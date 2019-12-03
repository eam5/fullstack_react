import React from 'react'

const Contacts = ({list}) => {
    return (
<div>{list.name}, {list.number}</div>
    )
}

// const Contacts = ({contacts}) => {
//     const rows = () => contacts.map(list =>
//         <Name
//             key={list.name}
//             list={list}
//         />
//     )
    
//     return (
//         <div>{rows()}</div>
//     )
// }
export default Contacts