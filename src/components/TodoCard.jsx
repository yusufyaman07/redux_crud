import Modal from "./Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../redux/actionTypes/actionTypes";
import { deleteTodo, updateTodo } from "../redux/actions/todoActions";
import axios from "axios";

const TodoCard = ({ todo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleIsdone = () => {
    const updated = { ...todo, is_done: !todo.is_done };

    axios
      .put(`/todos/${updated.id}`, updated)

      .then(() => dispatch(updateTodo(updated)));
  };

  const handleDelete = () => {
    axios
      .delete(`/todos/${todo.id}`)

      .then(() => dispatch(deleteTodo(todo.id)));
  };

  return (
    <div className="border shadow shadow-lg p-4 my-5">
      <h5>{todo.text}</h5>
      <h6>{todo.is_done ? "Completed" : "Continues"}</h6>
      <p>{todo.created_at}</p>

      <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary">
        Edit
      </button>
      <button onClick={toggleIsdone} className="btn btn-success mx-3">
        {todo.is_done ? "Take it back" : "Completed"}
      </button>
      <button onClick={handleDelete} className="btn btn-danger">
        Delete
      </button>

      {isOpen && <Modal close={() => setIsOpen(false)} todo={todo} />}
    </div>
  );
};

export default TodoCard;
