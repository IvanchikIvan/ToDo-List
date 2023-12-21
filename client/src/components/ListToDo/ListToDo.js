import React, { useState, useEffect } from "react";

const ListToDo = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:6969/todos");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.todo_id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListToDo;
