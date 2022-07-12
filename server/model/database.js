require("dotenv").config();
// get the client
const mysql = require("mysql2");

// create the connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DATABSE_USERNAME,
  database: process.env.DATABSE_NAME,
  password: process.env.DATABSE_PASSWORD,
});

module.exports = db;
