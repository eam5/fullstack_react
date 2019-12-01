import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'


const Course = ({course}) => {
    console.log(course.parts)
    return (
        <div>
            <Header course={course.name}/>
            <Content content={course.parts}/>
            <Total total={course.parts} />
        </div>
    )
}

export default Course