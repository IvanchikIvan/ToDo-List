import React from "react";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import "./App.css";
import ListToDo from "./components/ListToDo/ListToDo";
import Header from "./components/Header/Header";
import './reset.css'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <ListToDo />
      </div>
    </Provider>
  );
}

export default App;