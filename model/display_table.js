const { Client } = require('pg');
var conn_string = require('./pg_config')

async function display_store(store){
    const client = new Client(conn_string);
    await client.connect();

    const query = `SELECT * FROM products WHERE store_id = $1`;
    const values = [store];
    const result = await client.query(query, values);
    client.end();
    return result.rows;
}
module.exports = display_store;