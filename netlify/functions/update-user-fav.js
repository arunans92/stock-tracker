/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
        domain: "db.us.fauna.com"
    })
    let data = {};
    if (event.body) {
        data = JSON.parse(event.body)
        data.body = JSON.parse(data.body)
    } else {
        // test data
        data = {
            "body": {
                "id": "332325154447163465",
                "name": "Arunan S",
                "username": "arunan_cs@hotmail.com",
                "role": "Analyst",
                "preferences": {
                    "theme": "default",
                    "favorites": [
                        "test2",
                        "test1",
                        "test"
                    ]
                }
            }
        }
    }

    const id = data.body.id

    console.log(data)


    // Select(['data', 0],
    //     Paginate(Match(
    //         Index("accounts_by_email"), "test@test.com"
    //     ))
    // ),

    return client
        .query(q.Update(q.Ref(`classes/users/${id}`), { data }))
        .then((response) => {
            console.log('success', response)
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