const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.post("/todos", async (req, res) => {
  try {
    const { content } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos ( content ) VALUES($1)",
      [content]
    );

    res.json(newTodo);
    console.log(content);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM stands WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updateStand = await pool.query(
      "UPDATE todos SET content = $1 WHERE todo_id = $2",
      [content, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1",
      [id]
    );
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(6969, () => {
  console.log("server has started on port 6969");
});
