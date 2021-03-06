/* Api methods to call /functions */
import axios from 'axios'

const post = (data) => {
    return axios.post('/.netlify/functions/api-config', {
        body: JSON.stringify(data)
    }).then(response => {
        return response
    })
}

const get = async (functionName) => {
    return axios.get('/.netlify/functions/' + functionName).then(response => {
        return response
    })
}

const update = (data) => {
    console.log(data)
    return axios.post('/.netlify/functions/update-user-fav', {
        body: JSON.stringify(data)
    }).then(response => {
        return response
    })
}

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
    update: update,
    // delete: deleteTodo,
    // batchDelete: batchDeleteTodo
}