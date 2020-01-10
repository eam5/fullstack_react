const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

// const initialNotes = [
//   {
//     content: 'HTML is easy',
//     date: new Date(),
//     important: false,
//   },
//   {
//     content: 'Browser can execute only Javascript',
//     date: new Date(),
//     important: true,
//   },
// ]

beforeEach(async () => {
    await Note.deleteMany({})
  
    for (let note of helper.initialNotes) {
      let noteObject = new Note(note)
      await noteObject.save()
    }
})
// beforeEach(async () => {
//     await Note.deleteMany({})
  
//     const noteObjects = helper.initialNotes
//       .map(note => new Note(note))
//     const promiseArray = noteObjects.map(note => note.save())
//     await Promise.all(promiseArray)
// })
// beforeEach(async () => {
//     await Note.deleteMany({})
//     console.log('cleared')
  
//     helper.initialNotes.forEach(async (note) => {
//       let noteObject = new Note(note)
//       await noteObject.save()
//       console.log('saved')
//     })
//     console.log('done')
// })
// beforeEach(async () => {
//     await Note.deleteMany({})
  
//     let noteObject = new Note(helper.initialNotes[0])
//     await noteObject.save()
  
//     noteObject = new Note(helper.initialNotes[1])
//     await noteObject.save()
//   })


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

  test('a specific note can be viewed', async () => {
    const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
    }
    const notesAtStart = await notesInDb()
  
    const noteToView = notesAtStart[0]
    // console.log(noteToView)
  
    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
//   console.log(resultNote.body)
    expect(resultNote.body.content).toEqual(noteToView.content)
  })

  test('a note can be deleted', async () => {
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

afterAll(() => {
  mongoose.connection.close()
})