import React, {useState} from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const blogStyle = {
    padding: 5
  }
  const expandStyle ={
    borderLeft: 'solid',
    borderWidth: 3,
    borderColor: 'blueviolet',
    paddingLeft: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideButton = { 
    display: (user.name !== blog.user.name) ? 'none' : ''}
console.log(blog.user.name)
  return (
    <div style={blogStyle}>
    <div style={hideWhenVisible} onClick={toggleVisibility}>
      {blog.title}, {blog.author}
    </div>
    <div style={showWhenVisible}>
      <div style={expandStyle}>
      <div onClick={toggleVisibility}>
      {blog.title}, {blog.author}
      </div>
      <div>
        <a href="{blog.url}">{blog.url}</a>
        <br/>
        {blog.likes} likes <button onClick={addLike}>like</button><br />
        added by {blog.user.name} <br />
        <div style={hideButton}>
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}
export default Blog