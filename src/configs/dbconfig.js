const Pool = require('pg').Pool;


const pool = new Pool({
    user: 'YOUR_USERNAME',
    host: 'localhost',
    database: 'YOUR_DATABASE',
    password: 'YOUR_PASSWORD',
    port: 5432,//default port
});
module.exports = pool;