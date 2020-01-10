const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
      .then(blog => {
        if (blog) {
          response.json(blog.toJSON())
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  })
  try { 
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
  // blog
  //   .save()
  //   .then(savedBlog => {
  //       response.json(savedBlog.toJSON())
  //     })
  //   .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: body.likes })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})


module.exports = blogsRouter