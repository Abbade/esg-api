const { Pool, Client } = require('pg')
const { GENERIC_ERROR } = require('./responses')
const env = require('../.env')

//const pool = new Pool()

const pool = new Pool(env.pool)
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})


query = async (text, params) => {
    const client = await pool.connect()
    try {
        const res = await client.query(text, params)
        return res.rows;
    } 
    catch(err){
        console.log(err);
        throw err;
    }
    finally {
        client.release()
    }
}



module.exports = {
    query
}

  