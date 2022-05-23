/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = async (event, context) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
        domain: "db.us.fauna.com"
    })
    return client
        .query(q.Paginate(q.Match(q.Ref('indexes/apiconfigs'))))
        .then((response) => {
            const dataRefs = response.data
            console.log(`${dataRefs.length} found`)
            const getAllDataQuery = dataRefs.map((ref) => {
                return q.Get(ref)
            })
            return client.query(getAllDataQuery).then((ret) => {
                const filterData = [];
                ret.map((resData) => {
                    const urlSplit = resData.data.body.url.split('/');
                    if (urlSplit[urlSplit.length - 1] === 'stock-prices') {
                        filterData.push(resData);
                    }
                });
                return {
                    statusCode: 200,
                    body: JSON.stringify(filterData)
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