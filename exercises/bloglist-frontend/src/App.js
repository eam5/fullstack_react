import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
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

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        onSubmit={addBlog}
        handleBlogChange={handleBlogChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        newBlog={newBlog}
        newAuthor={newAuthor}
        newUrl={newUrl}
      />  
    </Togglable>
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
  blogFormRef.current.toggleVisibility()
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

  const addLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes +1}
console.log(changedBlog)
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
