import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddTodo from "./AddTodo";

function ModalView({ handleClose, show, setTodos, editingTodo }) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTodo ? "Edit Todo" : "Add Todo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTodo
            setTodos={setTodos}
            handleClose={handleClose}
            editingTodo={editingTodo}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalView;
