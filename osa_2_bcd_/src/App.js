import { useState, useEffect } from 'react'
// importing axios for api reasons
import axios from 'axios'

// importing from folder services file personService.js
import personServices from './services/personService'


  
// component that has state and if state tietty niin antaa ilmoituksen

const SuccesfullyAddedOrNot = ({succesfull}) => {
  // state for adding succesfully
  const [added, setAdded] = useState('')

  console.log('succesfull or not?', succesfull)
  // if prop === 'yes': return message
  if (succesfull === 'yes') {
    return (
    <div className='addedSuccesFully'>
      Added succesfully! 
    </div>
    
      )
  }

}



const App = () => {
  const [persons, setPersons] = useState([]) 
  // name state
  const [newName, setNewName] = useState('')
  // number state
  const [newNum, setNewNum] = useState('')

  // state for being a prop for component SuccesfullyAddedOrNot
  const [succesfull_2, setSuccesfull_2] = useState('no')





// setting persons state from db.json. APi for GET data from db to persons :D
useEffect(() => {
  axios
    .get('http://localhost:3005/api/persons/')
    .then(response => {
      console.log('promise fulfilled, getting data from db worked!')
      setPersons(response.data)
    })
}, [])


// function to check if person already in persons
  const alreadyInDB = (personObject) => {
    // making list of person names
    const listPersonNames = persons.map(person => person.name)

    // if statement to check if person in persons
    if (listPersonNames.includes(personObject.name)) {
      window.alert('already in phonebook :D')
      return 'siii'
    console.log('if already in array function worked')

  }
  }





  // addname adds newName and newNum to persons if not already in persons
  const addName = (event) => {
    event.preventDefault()

    // making const id number
    console.log('person lenght: ', persons.length)

    // making an object
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNum
    }

    console.log('personObject:', personObject)
    // checking if person already in DB
    if (alreadyInDB(personObject) === 'siii') {
      return 
    }
    // setting object to db.json
    personServices
    .create(personObject)
    // check if create worked
    console.log('promise fulfilled, adding new person to db worked!')

      
    // adding object to persons
    setPersons(persons.concat(personObject))

    // setting newName to ''
    setNewName('')
    // setting newNum to ''
    setNewNum('')

    console.log('addName function worked')
    
    // POST worked then change added to 'yes
    setSuccesfull_2('yes')

    // sleep for 2sec then set state
    setTimeout(() => {  setSuccesfull_2('no'); },2000);
    console.log('siuu')


  }

// handleNameChange. Putting value to newName state
const handleNameChange = (event) => {
  console.log('changing name! in hanhdleNameChage')
  setNewName(event.target.value)
  }

// handleNumChange makes newNum
const handleNumChange = (event) => {
  console.log('changing number! in handleNumChange')
  setNewNum(event.target.value)
}

// function to DELETE api command for deleting name
const removeName = (id) => {
  console.log('removing name!')
  // calling DELETE from personService
  personServices
  .remove(id)

  // setting state so page refresses
  setPersons(persons.filter(person => person.id !== id))
  console.log('DELETE promes fullfilled')

}

// function that makes html list of persons names and numbers
const showPerson = () => {
  
  return (
    <ul>
      {persons.map(person => (
        <li className= 'note' key={person.id}>{person.name} {person.number}
        <button onClick={() => removeName(person.id)}>
          delete
        </button>
         </li>
        ))
        }

    </ul>
  )

}


  return (
    <div>
      <h1>Phonebook</h1>
      <SuccesfullyAddedOrNot succesfull={succesfull_2}/>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNum}
          onChange={handleNumChange}
          />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{showPerson()}</div>
    </div>
  )

}

export default App