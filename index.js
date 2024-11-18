const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.static('dist'));
app.use(express.json())
app.use(cors())
morgan.token('data', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

//MONGO DATABASE LOGIC 
require('dotenv').config();
const Person = require('./models/person')
//


app.get('/', (request, response) => {
  response.send('<h1>Check http://localhost:3001/api/persons</h1>')
})

app.get('/info', (request, response) => {
  Person.find({}).then(pers => {
    const info = `<p>Phonebook has info for ${pers.length} people</p><p>${(new Date)}`
    response.send(info)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(pers => {
    response.json(pers)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(pers => {
    if (pers) {
      response.json(pers)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new:true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(pers => {
    response.status(204).end()
  })
  .catch(error => {
    next(error)
  });
})


// Error Handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } 

  next(error);
};

app.use(errorHandler);


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})





