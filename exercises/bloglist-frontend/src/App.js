import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login' 
import  { useField } from './hooks'

function App() {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null) 

  const username = useField('text')
  const password = useField('password')

  const newBlog = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = React.createRef()


  const blogForm = () => (
    <Togglable buttonLabel="new blog"  ref={blogFormRef} >
      <BlogForm
        onSubmit={addBlog}
        newBlog={newBlog}
        newAuthor={newAuthor}
        newUrl={newUrl}
      />  
    </Togglable>
  )

const addBlog = (event) => {
  event.preventDefault()
  blogFormRef.current.toggleVisibility()
  const blogObject = {
    title: newBlog.value,
    author: newAuthor.value,
    url: newUrl.value,
  }
console.log(blogObject)
  blogService
    .create(blogObject)
    .then(data => {
      setBlogs(blogs.concat(data))
      setErrorMessage(
        `${newBlog.value} was added`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })

    newBlog.reset()
    newAuthor.reset()
    newUrl.reset()
  }

  const addLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes +1}

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const deleteBlog = id => {
    const blog = blogs.find(n => n.id === id)

    if (window.confirm(`Delete '${blog.title}' from blog list?`)) {
      blogService
      .handleDelete(id)
      .then(setBlogs(blogs.filter(n => n.id !== id)))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )    
      blogService.setToken(user.token)
      setUser(user)
      
      username.reset()
      password.reset()
      
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const rows = () => blogs
    .sort((a,b) => -(a.likes - b.likes))
    .map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        addLike={() => addLike(blog.id)}
        deleteBlog={deleteBlog}
        user={user}
      />
    )
 
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} reset={null} name="Username"/>
      </div>
      <div>
        password
        <input {...password} reset={null} name="Password"/>
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {blogForm()}
      <br />
      {rows()}
    </div>
  )
}

export default App;
