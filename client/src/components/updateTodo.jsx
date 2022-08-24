import { useState, useEffect } from "react";
import axios from "axios";

export function UpdateTodo({ _id, handleClose, handleUpdate }) {
  const [data, setData] = useState({ title: "", description: "" });
  const [initialdata, setInitialData] = useState(null);
  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/todo/${_id}`)
      .then((res) => {
        console.log("updaing" + res.data.title);
        setInitialData({
          title: res.data.title,
          description: res.data.description,
        });
        setData({
          title: res.data.title,
          description: res.data.description,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();

    console.log({ _id }, { data });

    axios
      .put(`http://localhost:8000/api/todo/${_id}`, data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      })
      .then((res) => {
        handleUpdate();
        handleClose();
      });
  }

  return (
    initialdata && (
      <form
        className="form-container"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="title" className="label">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="input"
          defaultValue={initialdata.title}
          onChange={handleChange}
        />
        <label htmlFor="description" className="label">
          Description
        </label>
        <input
          type="text"
          name="description"
          className="input"
          defaultValue={initialdata.description}
          onChange={handleChange}
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    )
  );
}
