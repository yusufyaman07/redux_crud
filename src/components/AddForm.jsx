import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { ActionTypes } from "../redux/actionTypes/actionTypes";
import { addTodo } from "../redux/actions/todoActions";
import axios from "axios";

const AddForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const newTodo = {
      id: v4(),
      text: e.target[0].value,
      is_done: false,
      created_at: new Date().toLocaleDateString(),
    };

    axios
      .post("/todos", newTodo)

      .then(() => dispatch(addTodo(newTodo)));

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-3 my-5">
      <input
        className="form-control"
        placeholder="ex:learn redux"
        type="text"
      />

      <button className="btn btn-warning">Send</button>
    </form>
  );
};

export default AddForm;
