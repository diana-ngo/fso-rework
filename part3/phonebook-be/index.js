const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))
app.use(express.static('dist'))

let entries = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  return String(Math.floor(Math.random() * 1000000000))
}

app.get('/info', (request, response) => {
  const count = entries.length
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  response.json(entries)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const entry = entries.find(e => e.id === id)

  if (!entry) {
    return response.status(404).end()
  }

  response.json(entry)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).end()
  }

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'missing name or number' })
  }

  if (entries.find(e => e.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const entry = {
    id: generateId(),
    name: String(body.name),
    number: String(body.number)
  }

  entries = [...entries, entry]
  response.json(entry)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  entries = entries.filter(e => e.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})