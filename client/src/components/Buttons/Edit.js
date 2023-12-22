import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { updateTodos } from "../redux/actions";
import edit_button from '../Assets/edit-button.svg'

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const EditToDo = (id) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState('')

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const dispatch = useDispatch()

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:6969/todos");
      const data = await response.json();
      dispatch(updateTodos(data));
    } catch (err) {
      console.error(err.message);
    }
  };

  const editToDo = async e => {
    e.preventDefault();
    try {
      const body = { content };
      const response = await fetch(
        `http://localhost:6969/todos/${id.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      setModalOpen(false)
      fetchTodos()
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button className="edit-button" onClick={openModal}><img src={edit_button}></img></button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Edit Modal"
      >
        <h2>Edit Content</h2>
        <input type="text" value={content} placeholder="Edit" onChange={(e) => setContent(e.target.value)}/>
        <button onClick={(e) => {editToDo(e)}}>Edit</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default EditToDo;
