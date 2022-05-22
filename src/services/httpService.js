/* Api methods to call /functions */
import axios from 'axios'

const post = (data) => {
    return axios.post('/.netlify/functions/api-config', {
        body: JSON.stringify(data)
    }).then(response => {
        return response
    })
}

const get = async () => {
    return axios.get('/.netlify/functions/get-symbol-config').then(response => {
        return response
    })
}


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
    post: post,
    get: get,
    // update: update,
    // delete: deleteTodo,
    // batchDelete: batchDeleteTodo
}