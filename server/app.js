const express = require("express");
const pool = require("./model/database");

const app = express();

app.listen(process.env.PORT || "3000", () => {});

app.get("/todo", (req, res) => {
  const todoList = {};
  pool.query("SELECT * FROM TODO_LIST").then((data) => {
    const [columns] = [...data];

    const promise = columns.map((column) => {
      todoList[column.ID] = { name: column.TITLE };
      return pool
        .query(`SELECT * FROM TASKS WHERE LIST_ID=${column.ID}`)
        .then((result) => {
          const tasks = result[0];
          todoList[column.ID] = {
            name: column.TITLE,
            tasks,
          };
        });
    });

    Promise.all(promise).then(() => res.json(todoList));
  });
});
