import React from 'react'

const Notification = ({ message, newName }) => {
    const alertColor = {
        color: `red`
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