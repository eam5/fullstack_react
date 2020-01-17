import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Simple blog test title',
    author: 'Simpleblog Author',
    likes: 3
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Simple blog test title'
  )

  const div = component.container.querySelector('div')
  
  console.log(prettyDOM(div))
})

test('clicking the button calls event handler once', () => {
    const blog = {
        title: 'Simple blog test title',
        author: 'Simpleblog Author',
        likes: 3
      }
  
    const mockHandler = jest.fn()
  
    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  
    const button = getByText('like')
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls.length).toBe(1)
  })