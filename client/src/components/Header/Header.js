import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTodos } from "../redux/actions";
import "./Header.css";

const Header = () => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSaveTodo = async (e) => {
    console.log(e);
    e.preventDefault();

    console.log(content.replace("\n", "<br></br>"));
    try {
      const body = { content };
      const response = await fetch("http://localhost:6969/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      fetchTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

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
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Todo List</h1>
        <div className="header__add-todo">
          <input value={content} onChange={handleContentChange} className="header__input"/>
          <button onClick={handleSaveTodo} className="header__button">Add ToDo</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
