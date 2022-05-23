const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
    domain: "db.us.fauna.com"
  })

  const data = JSON.parse(event.body)
  data.body = JSON.parse(data.body)
  const item = { data: data }

  return client
    .query(q.Create(q.Ref('classes/apiconfigs'), item))
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