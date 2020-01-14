import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'  


function App() {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 

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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title: <input value={newBlog} onChange={handleBlogChange} /><br />
      author: <input value={newAuthor} onChange={handleAuthorChange} /><br />
      url: <input value={newUrl} onChange={handleUrlChange} /><br />
      <button type="submit">add</button>
    </form>
  )

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

const addBlog = (event) => {
  event.preventDefault()
  const blogObject = {
    title: newBlog,
    author: newAuthor,
    url: newUrl,
  }
console.log(blogObject)
  blogService
    .create(blogObject)
    .then(data => {
      setBlogs(blogs.concat(data))
      setErrorMessage(
        `${newBlog} was added`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })

    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )    
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
    />
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h3>Log in to application</h3>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <h3>Blogs</h3>
      <Notification message={errorMessage} />
      {blogForm()}
      <br />
      {rows()}
    </div>
  )
}

export default App;
