const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let notes = [
    {
    "id": 1,
    "content": "HTML is easy",
    "date": "2019-05-30T17:30:31.098Z",
    "important": true
    },
    {
    "id": 2,
    "content": "Browser can execute only Javascript",
    "date": "2019-05-30T18:39:34.091Z",
    "important": true
    },
    {
    "id": 3,
    "content": "GET and POST are the most important methods of HTTP protocol",
    "date": "2019-05-30T19:20:14.298Z",
    "important": true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/notes', (request, response) => {
    const body = request.body
    
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }
    notes = notes.concat(note)

    response.json(note)
})

app.get('/notes/', (request, response) => {
    response.json(notes)
})

app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => {
        console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
    })

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
    console.log(note) 
})


app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
