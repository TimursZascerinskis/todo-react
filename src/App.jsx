import { useState } from 'react'
import './App.css'

function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return JSON.parse(savedTodos);
  });

  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);




  function addTodo() {
    if (task.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      name: task
    };

    setTodos([...todos, newTodo]);
    setTask("");
  }

  function updateTodo() {
    setTodos(
      todos.map((todo) =>
        todo.id === editId
          ? { ...todo, name: task }
          : todo
      )
    );

    setTask("");
    setEditId(null);
  }

  return (
    <div>
      <h1>Mans To-Do Saraksts</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Ieraksti uzdevumu..."
      />
      {editId ? (
        <button onClick={updateTodo}>Saglabāt izmaiņas</button>
      ) : (
        <button onClick={addTodo}>Pievienot</button>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.name}{" "}
            <button onClick={() => {
              setTask(todo.name);
              setEditId(todo.id);
            }}>
              Rediģēt
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
