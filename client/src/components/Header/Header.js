import React, { useState, useEffect } from "react";

const Header = () => {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);

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
      setTodos(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <header className="header">
      <h1>Todo List</h1>
      <input value={content} onChange={handleContentChange} />
      <button onClick={handleSaveTodo}>Add ToDo</button>
    </header>
  );
};

export default Header;
