

const express = require('express')
const app = express()


// accepting request from spesific url
const cors = require('cors');
app.use(cors({
   origin: 'http://localhost:3000' 
  }));



// require morgan
const morgan = require('morgan')

// app yse morgan
app.use(morgan('tiny'))



const http = require('http')


app.use(express.json())

// kovakoodattu jeeson
let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: true
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Marry Poppendick",
      number: "39-23-6423122"
    }
  ]



// get to test morgan
app.get('/api/siuuu', (request, response) => {

  console.log('siuu')


})


app.get('/api/persons', (req, res) => {
  res.json(persons)
})


app.get('/info', (req, res) => {
    
    // fetching date and time
    const date_ob = new Date();
    const personLenght = persons.length
    const text = `Phonebook has info for ${personLenght} people date: ${date_ob}`
    res.json(text)
  })


// getting one person
app.get('/api/persons/:id', (request, response) => {

    const id = request.params.id
    const person = persons.find(person => person.id.toString() === id)

    // if person exists
    if (person) {
    response.json(person)
    }
    else response.status(404).end()

})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  
  console.log('this is id')
       
  const person = persons.find(person => person.id === id)

  console.log('note === True?', note === true)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// DELETE
app.delete('/api/persons/:id', (request, response) => {
  
  console.log('here') 
  console.log('persons before', persons)
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
  console.log('persons after', persons)
})



// POST
// The POST works at least with Postman. Don't know if it works in vs code rest client
app.post('/api/persons/', (request, response) => {

  // name already in persons. mapin person names check if in map
  const arrayOfNames = persons.map(person => person.name)
  console.log(arrayOfNames)


  // random number
  const random = Math.random() * 1000

  const body = request.body
  

  console.log('body name', body.name)
  console.log('body number', body.number)
  console.log('body id', body.id)
  // if person already in persons
  if (arrayOfNames.includes(body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })

  }


  // check if body.name or body.number === ''
  if (!body.name || !body.number)  {
    // if name empty
    if (body.name === '') {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    else {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    }

  
  console.log('this is body', body)


  const person = {
    name: body.name,
    number: body.number,
    id: random,
  }

  console.log('person made succesfull')
  persons = persons.concat(person)
  console.log('POST works, random num:', random)

  response.json(person)
})



const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})








