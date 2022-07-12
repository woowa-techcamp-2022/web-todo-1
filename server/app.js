const express = require("express");
const db = require("./model/database");
const app = express();

app.listen(process.env.PORT || "3000", () => {
  console.log("start");
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM professor", (error, results) => {
    console.log(results);
  });
});
