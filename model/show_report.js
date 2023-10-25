const { Client } = require('pg');
var conn_string = require('./pg_config')

async function show_report(){
    const client = new Client(conn_string);
    await client.connect();

    const query = `
        SELECT
        products.product_name,
        products.price,
        products.quantity,
        stores.store_name,
        stores.store_address,
        stores.store_phone
    FROM
        products
    INNER JOIN
        stores
    ON
        products.store_id = stores.store_id;
    `;
    const result = await client.query(query);
    client.end();
    return result.rows;
}
module.exports = show_report;