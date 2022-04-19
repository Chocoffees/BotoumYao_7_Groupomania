// Configure Groupomania database

// Import mysql
const mysql = require('mysql2');

// Import 'dotenv' package
require('dotenv').config()

// Establish connection to database
const connection =  mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'process.env.SECRET_DB',
  database : 'data'
})

//test query
connection.query(
  'SELECT * FROM `users` WHERE `username`= "usertest"',
  function(err, results, fields) {
console.log(results);
console.log(fields);
  }
);
module.exports = connection;
