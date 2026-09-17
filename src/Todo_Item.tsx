interface Todo {
  id: number
  name: string
}

interface Props {
  todo: Todo
  onEdit: () => void
  onDelete: () => void
}

function TodoItem({ todo, onEdit, onDelete }: Props) {
  return (
    <li>
      {todo.name}{' '}

      <button onClick={onEdit}>
        Rediģēt
      </button>

      <button onClick={onDelete}>
        NOŅEMT NO SARAKSTA
      </button>
    </li>
  )
}

export default TodoItem
