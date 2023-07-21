import { EditIcon, DeleteIcon } from "./icons/icons";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editedTodo, setEditedTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo.trim(), isDone: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const startEditing = (index, todo) => {
    setEditedTodo(todo.text);
    setEditIndex(index);
  };

  const handleEditChange = (e) => {
    setEditedTodo(e.target.value);
  };

  const saveEdit = () => {
    if (editedTodo.trim() !== "") {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, text: editedTodo.trim() } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditedTodo("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodos);
  };

  const countCompletedTodos = () => {
    return todos.filter((todo) => todo.isDone).length;
  };

  return (
    <div className="container">
      <div className="title">
        <div>My Todo list</div>
        <div className="count">
          {countCompletedTodos()}/{todos.length}
        </div>
      </div>

      <div className="list">
        {todos.map((todo, index) => (
          <div className="todo" key={index}>
            {/* editable  item */}
            {editIndex === index && (
              <div className="checkbox">
                <input
                  type="text"
                  value={editedTodo}
                  onChange={handleEditChange}
                />
                <button onClick={saveEdit}>Save</button>
              </div>
            )}
            {/* main item  */}
            {editIndex !== index && (
              <>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => toggleTodo(index)}
                  />
                  {todo.text}
                </div>
                <div className="actions">
                  <div onClick={() => startEditing(index, todo)}>
                    <EditIcon />
                  </div>
                  <div onClick={() => deleteTodo(index)}>
                    <DeleteIcon />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="what's next?"
        />
        <div className="button" onClick={addTodo}>
          Add task
        </div>
      </div>
    </div>
  );
}

export default App;
