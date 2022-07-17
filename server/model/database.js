require("dotenv").config();
// get the client
const mysql = require("mysql2/promise");

// create the connection to database
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  timezone: "Asia/Seoul",
});

module.exports = pool;
