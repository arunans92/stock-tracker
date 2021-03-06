/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
        domain: "db.us.fauna.com"
    })
    return client
        .query(q.Paginate(q.Match(q.Ref('indexes/users'))))
        .then((response) => {
            const dataRefs = response.data
            console.log(`${dataRefs.length} found`)
            const getAllDataQuery = dataRefs.map((ref) => {
                return {
                    refId: ref.id,
                    res: q.Get(ref)
                }
            })
            return client.query(getAllDataQuery).then((ret) => {
                const responseData = [];
                ret.map((data) => {
                    data.res.data.body.id = data.refId;
                    responseData.push(data.res);
                })
                return {
                    statusCode: 200,
                    body: JSON.stringify(responseData)
                }
            })
        }).catch((error) => {
            console.log('error', error)
            return {
                statusCode: 400,
                body: JSON.stringify(error)
            }
        })
}