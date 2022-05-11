/* Api methods to call /functions */
import axios from 'axios'

const create = (data) => {
    return axios.post('/.netlify/functions/faunadb', {
        body: JSON.stringify(data)
    }).then(response => {
        return response
    })
}

//   const readAll = () => {
//     return fetch('/.netlify/functions/todos-read-all').then((response) => {
//       return response.json()
//     })
//   }

//   const update = (todoId, data) => {
//     return fetch(`/.netlify/functions/todos-update/${todoId}`, {
//       body: JSON.stringify(data),
//       method: 'POST'
//     }).then(response => {
//       return response.json()
//     })
//   }

//   const deleteTodo = (todoId) => {
//     return fetch(`/.netlify/functions/todos-delete/${todoId}`, {
//       method: 'POST',
//     }).then(response => {
//       return response.json()
//     })
//   }

//   const batchDeleteTodo = (todoIds) => {
//     return fetch(`/.netlify/functions/todos-delete-batch`, {
//       body: JSON.stringify({
//         ids: todoIds
//       }),
//       method: 'POST'
//     }).then(response => {
//       return response.json()
//     })
//   }

export default {
    create: create,
    // readAll: readAll,
    // update: update,
    // delete: deleteTodo,
    // batchDelete: batchDeleteTodo
}