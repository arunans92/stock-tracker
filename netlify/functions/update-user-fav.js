/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
        domain: "db.us.fauna.com"
    })
    console.log(event.body)
    const data = JSON.parse(event.body)
    console.log(data)
    data.body = JSON.parse(data.body)
    console.log(data)
    // const newdata = {
    //     "id": "124",
    //     "name": "Arunan",
    //     "username": "arunan_cs@hotmail.com",
    //     "role": "Analyst",
    //     "preferences": {
    //         "theme": "default",
    //         "favorites": [
    //             "TECHM.NS",
    //             "MARUTI.NS"
    //         ]
    //     }
    // }

    const id = data.body.id
    const item = { body: data }
    // Select(['data', 0],
    //     Paginate(Match(
    //         Index("accounts_by_email"), "test@test.com"
    //     ))
    // ),
    console.log(item)
    return client
        .query(q.Update(q.Ref(`classes/users/${id}`), item))
        // .query(q.Update(q.Ref(`classes/users/${id}`), item))
        .then((response) => {
            return {
                statusCode: 200,
                body: JSON.stringify(response)
            }
        }).catch((error) => {
            console.log('error', error)
            return {
                statusCode: 400,
                body: JSON.stringify(error)
            }
        })
}