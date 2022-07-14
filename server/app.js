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
    const promise = columns.map((column) => {
      todoList[column.ID] = { name: column.TITLE };
      return pool
        .query(
          `SELECT ID id, TITLE title, BODY body, AUTHOR author FROM TASKS WHERE LIST_ID=${column.ID} AND IS_DELETE = 0 ORDER BY START_DATE DESC`
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

  app.delete("/todo/:taskId", (req, res) => {
    const { taskId } = req.params;
    const queryStatement = `UPDATE TASKS SET IS_DELETE = 1 , UPDATE_DATE=NOW()  WHERE ID=${taskId};`;
    try {
      pool.query(queryStatement).then((result) => res.json({ success: true }));
    } catch (error) {
      throw new Error(error);
    }
  });

  app.patch("/todo/:taskId", (req, res) => {
    const { taskId } = req.params;
    const { body, actionType, toColumnId } = req.body;

    const queryMap = {
      update: `UPDATE TASKS SET BODY = '${body}' , UPDATE_DATE=NOW()  WHERE ID=${taskId};`,
      move: `UPDATE TASKS SET LIST_ID = '${toColumnId}' , UPDATE_DATE=NOW()  WHERE ID=${taskId};`,
    };

    const queryStatement = queryMap[actionType];

    try {
      pool.query(queryStatement).then((result) => res.json({ success: true }));
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
