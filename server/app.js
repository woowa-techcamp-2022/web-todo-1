const express = require("express");
const createError = require("http-errors");
const pool = require("./model/database");

const app = express();
app.use(express.json());
app.use(express.static("dist"));

app.listen(process.env.PORT || "3000", () => {});

app.get("/todo", (req, res) => {
  const todoList = {};
  // todoList를 db에서 가져온다.
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
    // todoList task저장
    const { columnId, title, body, author } = req.body;
    try {
      pool
        .query(
          `INSERT INTO TASKS (LIST_ID, TITLE, BODY, AUTHOR, START_DATE, UPDATE_DATE, IS_DELETE) VALUES (${columnId}, "${title}", "${body}", "${author}", NOW(), NOW(), 0)`
        )
        .then((result) => {
          const { insertId: taskId } = result[0];
          const logQuery = `INSERT INTO HISTORY (TASK_ID, ACTION_TYPE, FROM_LIST_ID, START_DATE, UPDATE_DATE) VALUES (${taskId}, 1, ${columnId}, NOW(), NOW())`;
          pool.query(logQuery).then(() => {
            res.json(result[0]);
          });
        });
    } catch (error) {
      throw new Error(error);
    }
  });

  app.delete("/todo/:taskId", (req, res) => {
    const { taskId } = req.params;

    const queryStatement = `UPDATE TASKS SET IS_DELETE = 1 , UPDATE_DATE=NOW()  WHERE ID=${taskId};`;
    try {
      pool.query(queryStatement).then((result) => {
        const logQuery = `INSERT INTO HISTORY (TASK_ID, ACTION_TYPE, START_DATE, UPDATE_DATE) VALUES (${taskId}, 2, NOW(), NOW())`;
        pool.query(logQuery).then(() => {
          res.json({ success: true });
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  app.patch("/todo/:taskId", (req, res) => {
    const { taskId } = req.params;
    const { body, actionType, fromColumnId, toColumnId } = req.body;

    const queryMap = {
      update: `UPDATE TASKS SET BODY = '${body}' , UPDATE_DATE=NOW()  WHERE ID=${taskId};`,
      move: `UPDATE TASKS SET LIST_ID = '${toColumnId}' , UPDATE_DATE=NOW()  WHERE ID=${taskId};`,
    };

    const queryStatement = queryMap[actionType];

    try {
      pool.query(queryStatement).then(() => {
        const logQuery = `INSERT INTO HISTORY (TASK_ID, ACTION_TYPE, FROM_LIST_ID, TO_LIST_ID, START_DATE, UPDATE_DATE) VALUES (${taskId}, 4, ${fromColumnId}, ${toColumnId}, NOW(), NOW())`;
        pool.query(logQuery).then(() => {
          res.json({ success: true });
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  });

  app.get("/history", (req, res) => {
    try {
      const queryStatement = `SELECT B.TITLE as title, 
                                CASE
                                  WHEN A.ACTION_TYPE = 1
                                THEN '등록'
                                WHEN A.ACTION_TYPE = 2
                                THEN '삭제'
                                WHEN A.ACTION_TYPE = 3
                                  THEN '변경'
                                WHEN A.ACTION_TYPE = 4
                                  THEN '이동'
                                END as actionTypeName,
                                A.ACTION_TYPE as actionType,
                                C.TITLE  as fromColumnTitle,
                                D.TITLE as toColumnTitle,
                                B.AUTHOR  as author,
                                A.START_DATE as startDate
                          FROM HISTORY A 
                          INNER JOIN TASKS B
                            ON A.TASK_ID = B.ID 
                          LEFT JOIN TODO_LIST C
                            ON A.FROM_LIST_ID = C.ID
                          LEFT JOIN TODO_LIST D
                            ON A.TO_LIST_ID = D.ID
                          ORDER BY A.START_DATE DESC`;

      pool.query(queryStatement).then((result) => {
        const [history] = result;
        res.json(history);
      });
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
