require('dotenv').config()
const Person = require('./models/person.js')
const express = require('express')
const morgan = require('morgan')
const app = express()

const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(express.json())
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

app.get('/info', (request, response, next) => {
  Person
    .countDocuments({})
    .then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
        `)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then((entries) => response.json(entries))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(entry => {
      if (!entry) {
        return response.status(404).end()
      }

      response.json(entry)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body) {
    return response.status(400).end()
  }

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'missing name or number' })
  }

  const entry = new Person({
    name: body.name,
    number: body.number
  })

  entry
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.number = request.body.number

      return person
        .save()
        .then(savedPerson => response.json(savedPerson))
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))