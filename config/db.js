const { Pool, Client } = require('pg')
const { GENERIC_ERROR } = require('./responses')
require('dotenv').config();

//const pool = new Pool()

const poolEnv =  {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
}

if(process.env.NODE_ENV === 'production'){
    poolEnv.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolEnv)
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

  