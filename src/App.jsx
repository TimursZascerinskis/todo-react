import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  function deleteTodo(idToDelete) {
    if (editId === idToDelete) {
      setEditId(null);
      setTask("");
    }
    setTodos(todos.filter((todo) => todo.id !== idToDelete));
  }

  return (
    <div>

      <h1>🚀 Mans Produktīvais To-Do</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}

        placeholder="Jauns uzdevums..."

      />
      {editId ? (
        <button onClick={updateTodo}>Saglabāt izmaiņas</button>
      ) : (
        <button onClick={addTodo}>Pievienot</button>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            {todo.name}{" "}
            <button onClick={() => {
              setTask(todo.name);
              setEditId(todo.id);
            }}>
              Rediģēt
            </button>
            <button onClick={() => deleteTodo(todo.id)} style={{ color: "orange", marginLeft: "15px" }}>
              NOŅEMT NO SARAKSTA

            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;