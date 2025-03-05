import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

function AddTodo({ setTodos, handleClose, editingTodo }) {
  const [todo, setTodo] = useState({ title: "", completed: false });

  useEffect(() => {
    if (editingTodo) {
      setTodo({
        title: editingTodo.title,
        completed: editingTodo.completed ?? false,
      });
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: name === "completed" ? value === "Completed" : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo.title.trim() === "") return;
    try {
      if (editingTodo) {
        await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`,
          {
            title: todo.title,
            completed: todo.completed,
          }
        );
        setTodos((prev) =>
          prev.map((item) =>
            item.id === editingTodo.id
              ? { ...item, title: todo.title, completed: todo.completed }
              : item
          )
        );
        toast.success("Task updated successfully!");
      } else {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/todos",
          {
            title: todo.title,
            completed: todo.completed,
          }
        );
        const newTodo = {
          id: response.data.id,
          title: todo.title,
          completed: todo.completed,
        };
        setTodos((prev) => [...prev, newTodo]);
        toast.success("New task added!");
      }
      setTodo({ task: "", completed: false });
      handleClose();
    } catch (err) {
      toast.error("Error adding task!");
      console.log("Error adding todo:", err);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your task"
            name="title"
            value={todo.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={todo.completed ? "Completed" : "Pending"}
            name="completed"
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>
        <div className="text-end">
          <button type="submit" className="btn btn-primary px-3">
            {editingTodo ? "Save Changes" : "Add"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AddTodo;
