const { Client } = require('pg');
var conn_string = require('./pg_config')

async function authenticate(uname, pword){
    let auth = false;
    let role = "";
    let store = "";
    const client = new Client(conn_string);
    await client.connect();

    const text = 'SELECT * FROM accounts WHERE username=$1 AND password=$2'
    const values = [uname, pword]
    const result = await client.query(text, values)
    if (result.rowCount == 1){
        auth = true;
        role = result.rows[0]['role'];
        store = result.rows[0]['store_id'];
    }
    client.end();
    return {"auth": auth, "role": role, "store": store};
}
module.exports = authenticate;