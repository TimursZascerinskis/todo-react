import { useState, useEffect } from 'react'
import TodoItem from './Todo_Item'
import Spinner from './Spinner'

interface Todo {
  id: number
  name: string
}

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [task, setTask] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    if (task.trim() === '') return

    setTodos([
      ...todos,
      {
        id: Date.now(),
        name: task
      }
    ])

    setTask('')
  }

  function updateTodo() {
    setTodos(
      todos.map((todo) =>
        todo.id === editId
          ? { ...todo, name: task }
          : todo
      )
    )

    setTask('')
    setEditId(null)
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id))
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
        <button onClick={updateTodo}>
          Saglabāt izmaiņas
        </button>
      ) : (
        <button onClick={addTodo}>
          Pievienot
        </button>
      )}

      <Spinner />

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={() => {
              setTask(todo.name)
              setEditId(todo.id)
            }}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  )
}