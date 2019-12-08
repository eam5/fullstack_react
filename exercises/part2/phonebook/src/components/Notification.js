import React from 'react'

const Notification = ({ message, newName }) => {
    const alertColor = {
        color: message === `${newName} was already deleted from server` ? 'red' : 'darkblue'
    }

    if (message === null) {
        return null
    } 

    return (
        <div className="error" style={alertColor}>
            {message}
        </div>
    )
}

export default Notification