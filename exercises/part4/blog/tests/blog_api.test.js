const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(2)
})

test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    const noteToView = response.body[0]

    expect(noteToView.id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog ={
        title: 'A new blog post',
        author: 'An author name',
        url: 'blog.com',
        likes: 4,
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(response.body.length)
})

test('likes default to zero', async () => {
  const newBlog = {
    title: 'Blog with no likes',
    author: 'Author',
    url: 'ablog.com',
  }

  const resultBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(resultBlog.body.likes).toEqual(0)
})

test('note without title/url is not added', async () => {
  const newBlog = {
    author: 'Name',
  }

  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})