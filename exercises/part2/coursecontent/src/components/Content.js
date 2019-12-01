import React from 'react'
import Part from './Part'

const Content = ({ content }) => {
    const rows = () => content.map(part =>
        <Part
          key={part.id}
          part={part}
        />
      )
    
    return (
        <div>
            {rows()}
        </div>
    )
}

export default Content