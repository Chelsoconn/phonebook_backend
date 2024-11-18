const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.static('dist'));

//MONGO DATABASE LOGIC 
require('dotenv').config();
const Person = require('./models/person')
//


app.use(express.json())
app.use(cors())
morgan.token('data', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (request, response) => {
  response.send('<h1>Check http://localhost:3001/api/persons</h1>')
})

app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${(new Date)}`
  response.send(info)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(pers => {
    response.json(pers)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(pers => {
    response.json(pers)
  })
})

app.post('/api/persons', async (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: 'Name is missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
});




app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(pers => {
    response.status(204).end()
  })
  .catch(error => {
    console.error('Error deleting the person:', error);
    response.status(500).json({ error: 'Failed to delete the person' });
  });
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})





