import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../redux/actions";
import Delete from "../Buttons/Delete";
import EditToDo from '../Buttons/Edit'
import './ListToDo.css'

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
      <ul className="todo-list__ul">
        {todos.map((todo) => (
          <li key={todo.todo_id} className="todo-list__ul-item">
            {todo.content}
            <div className="actions">
              <EditToDo id={todo.todo_id} />
              <Delete id={todo.todo_id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListToDo;
