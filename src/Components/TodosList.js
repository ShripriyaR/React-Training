import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import ModalView from "./ModalView";
import axios from "axios";

function TodosList() {
  const [show, setShow] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleClose = () => {
    setShow(false);
    setEditingTodo(null);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const handleDelete = async (todo) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`
      );
      setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id)); 
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    handleShow();
  };
  return (
    <div>
      <h1 className="text-center mb-4">Todo List</h1>
      <div className="text-end mb-3">
        <button className="btn btn-primary px-4" onClick={handleShow}>
          Add
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Todo</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos &&
            todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "Completed" : "Pending"}</td>
                <td>
                  <button
                    className="btn btn-primary me-2 px-3"
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(todo)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ModalView
        handleClose={handleClose}
        show={show}
        setTodos={setTodos}
        editingTodo={editingTodo}
      />
    </div>
  );
}

export default TodosList;
