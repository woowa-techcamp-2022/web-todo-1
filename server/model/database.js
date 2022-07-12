// get the client
const mysql = require("mysql2");

// create the connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "1234",
});

module.exports = db;
