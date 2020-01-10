const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(u => u.toJSON())
    }
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersInDb = async () => {
      const users = await User.find({})
      return users.map(u => u.toJSON())
    }

    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
  
    for (let note of helper.initialNotes) {
      let noteObject = new Note(note)
      await noteObject.save()
    }
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes returned', async () => {
    const response = await api.get('/api/notes')
  
    expect(response.body.length).toBe(helper.initialNotes.length)
  })

  test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    
    expect(contents).toContain('HTML is easy')
    // expect(response.body[0].content).toBe('HTML is easy')
  })

  describe('viewing a specific note', () => {
    test('a specific note can be viewed', async () => {
      const notesInDb = async () => {
        const notes = await Note.find({})
        return notes.map(note => note.toJSON())
      }
      const notesAtStart = await notesInDb()
    
      const noteToView = notesAtStart[0]
    
      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(resultNote.body.content).toEqual(noteToView.content)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const nonExistingId = async () => {
        const note = new Note({ content: 'willremovethissoon', date: new Date() })
        await note.save()
        await note.remove()

        return note._id.toString()
      }
      const validNonexistingId = await nonExistingId()

      console.log(validNonexistingId)

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('a valid note can be added ', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }
    
      await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/notes')
    
      const contents = response.body.map(r => r.content)
    
      expect(response.body.length).toBe(helper.initialNotes.length + 1)
      expect(contents).toContain(
        'async/await simplifies making async calls'
      )
    })

    test('note without content is not added', async () => {
      const newNote = {
        important: true
      }
    
      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)
    
      const response = await api.get('/api/notes')
    
      expect(response.body.length).toBe(helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesInDb = async () => {
          const notes = await Note.find({})
          return notes.map(note => note.toJSON())
      }
      const notesAtStart = await notesInDb()
      const noteToDelete = notesAtStart[0]
    
      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)
    
      const notesAtEnd = await notesInDb()
    
      expect(notesAtEnd.length).toBe(
        helper.initialNotes.length - 1
      )
    
      const contents = notesAtEnd.map(r => r.content)
    
      expect(contents).not.toContain(noteToDelete.content)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})