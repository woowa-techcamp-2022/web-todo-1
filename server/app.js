const express = require("express");
const pool = require("./model/database");

const app = express();

app.listen(process.env.PORT || "3000", () => {});

app.get("/", (req, res) => {
  pool.query("SELECT * FROM TODO_LIST").then((data) => res.json(data[0]));
});
