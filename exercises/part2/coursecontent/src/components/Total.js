import React from 'react'

const Total = ({ total }) => {
    const totalAmount = total.reduce(function(sum, part) {
        return sum + part.exercises
    }, 0)
    return (
        <p>Total number of exercises {totalAmount}</p>
    )
}

export default Total