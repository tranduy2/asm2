const { Client } = require('pg');
var conn_string = require('./pg_config')

async function crud(body, store){
    const client = new Client(conn_string);
    await client.connect();
    let name = body.name;
    let price = parseFloat(body.price);
    let quantity = parseInt(body.quantity);
    let id = parseInt(body.id);
    let store_id = store;
    let btn = body.btn;
    //update
    if(btn == "update"){
        const query = `UPDATE products SET product_name = $1, price = $2, quantity = $3 WHERE id = $4`;
        const values = [name, price, quantity, id];

        await client.query(query, values);
    }
    //delete
    else if(btn == "delete"){
        const query = `DELETE FROM products WHERE id = $1`;
        const values = [id];
        
        await client.query(query, values);
    }
    //add
    else{
        const query = `INSERT INTO products (store_id, product_name, price, quantity)
                        VALUES ($1, $2, $3, $4)`;
        const values = [store_id, name, price, quantity];

        await client.query(query, values);
    }
}
module.exports = crud;