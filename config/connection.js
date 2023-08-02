const mysql = require('mysql2');
// create connection to database

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db'
},
    console.log(`Connected to the employees_db database.`)
);

module.exports = db;