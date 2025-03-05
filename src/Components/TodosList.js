import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import ModalView from "./ModalView";
import axios from "axios";
import PaginationComponent from "./PaginationComponent";
import FilterComponent from "./FilterComponent";
import { toast } from "react-toastify";

function TodosList() {
  const [show, setShow] = useState(false);
  const [todos, setTodos] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 10;

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
      toast.success("Task deleted successfully!")
    } catch (error) {
      toast.error("Error deleting task.");
    }
  };

  const handleToggleStatus=async(id,currentStatus)=>{
    try{
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        completed:!currentStatus
      })
      setTodos(todos.map(item=>item.id===id?{...item,completed:!currentStatus}:item))
    }catch(err){
      console.error("Error toggling status",err)
    }
  }
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    handleShow();
  };
  const filteredTodos = searchItem
    ? todos.filter((item) =>
        item.title.toLowerCase().includes(searchItem.toLowerCase())
      )
    : todos;

  const offset = currentPage * tasksPerPage;
  const currentTasks = filteredTodos.slice(offset, offset + tasksPerPage);
  const pageCount = Math.ceil(filteredTodos.length / tasksPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <h1 className="text-center mb-4">Todo List</h1>
      <div className="d-flex mb-3 gap-5 justify-content-end">
        <FilterComponent
          searchItem={searchItem}
          setSearchItem={setSearchItem}
        />
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
          {currentTasks &&
            currentTasks.map((todo, index) => (
              <tr key={index}>
                <td>{todo.id}</td>
                <td
                  onClick={() => handleToggleStatus(todo.id, todo.completed)}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {todo.title}
                </td>
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
      {filteredTodos.length > tasksPerPage && (
        <PaginationComponent
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      )}

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
