const config = require('config');
const dbConfig = config.get('db');
const { Pool } = require('pg')
const connectionString = `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
const pool = new Pool({
    connectionString:  connectionString,
})
module.exports = {
    query: (text, params) => pool.query(text, params),
}