import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../redux/actions";

const ListToDo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:6969/todos");
      const data = await response.json();
      dispatch(updateTodos(data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [dispatch]);

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
