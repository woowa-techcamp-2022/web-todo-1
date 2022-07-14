const express = require("express");
// const bodyParser = require("body-parser");
const pool = require("./model/database");

const app = express();
app.use(express.json());

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

  app.post("/todo", (req, res) => {
    const { columnId, title, body, author } = req.body;
    try {
      pool
        .query(
          `INSERT INTO TASKS (LIST_ID, TITLE, BODY, AUTHOR, START_DATE, UPDATE_DATE, IS_DELETE) VALUES (${columnId}, "${title}", "${body}", "${author}", NOW(), NOW(), 0)`
        )
        .then((result) => res.json(result[0]));
    } catch (error) {
      throw new Error(error);
    }
  });
});
