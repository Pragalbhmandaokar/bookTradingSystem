const mysql = require('mysql2');

var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
}).on("error", (err) => {
    console.log("failed to connect to database - ", err);
});

module.exports = connection;