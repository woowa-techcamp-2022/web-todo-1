const express = require("express");
const path = require("path");
const createError = require("http-errors");
// const bodyParser = require("body-parser");
const pool = require("./model/database");

const app = express();
app.use(express.json());
app.use(express.static("dist"));

app.listen(process.env.PORT || "3000", () => {});

app.get("/todo", (req, res) => {
  const todoList = {};
  pool.query("SELECT * FROM TODO_LIST").then((data) => {
    const [columns] = [...data];
    console.log("get!");
    const promise = columns.map((column) => {
      todoList[column.ID] = { name: column.TITLE };
      return pool
        .query(
          `SELECT ID id, TITLE title, BODY body, AUTHOR author FROM TASKS WHERE LIST_ID=${column.ID}`
        )
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

  app.patch("/todo/:taskId", (req, res) => {
    console.log("patch!");
    const { taskId } = req.params;
    const { body } = req.body;

    try {
      pool
        .query(
          `UPDATE TASKS SET BODY = '${body}' , UPDATE_DATE=NOW()  WHERE ID=${taskId};`
        )
        .then((result) => res.json({ success: true }));
    } catch (error) {
      throw new Error(error);
    }
  });
  app.use((req, res, next) => {
    next(createError(404));
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(err);
  });
});
