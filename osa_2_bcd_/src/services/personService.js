

import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
    axios
    .post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {

    // if statement that makes window alert
    if (window.confirm("Do you really want to delete?")) {
        axios
        .delete(baseUrl + '/' + id)
        console.log('DELETE promis succesfull')
    }

}




export default {create, remove}
















