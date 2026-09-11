import { useState, useEffect } from 'react' // 1. Pievienojam useEffect
import './App.css'

function App() {
  // Salabots: ja localStorage ir tukšs, atgriežam tukšu masīvu []
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  // 2. Automātiski saglabājam todos iekš localStorage, kad saraksts mainās
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

  // --- JAUNĀ FUNKCIONALITĀTE: Dzēšanas funkcija ---
  function deleteTodo(idToDelete) {
    // Ja pašlaik tiek rediģēts tieši tas elements, kuru dzēšam, atceļam rediģēšanu
    if (editId === idToDelete) {
      setEditId(null);
      setTask("");
    }
    // Saglabājam visus elementus, izņemot to, kuram sakrīt ID
    setTodos(todos.filter((todo) => todo.id !== idToDelete));
  }

  return (
    <div>

      <h1>🚀 Mans Produktīvais To-Do</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Ko tu paveiksi šodien?"
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

            {/* --- JAUNĀ POGA: Dzēst --- */}

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