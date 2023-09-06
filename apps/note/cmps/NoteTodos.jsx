const { useState } = React

export function NoteTodos({ id, createdAt, isPinned, style, info }) {
  const [todos, setTodos] = useState(info.todos)
  const { title } = info

  function handleOnChange(index) {
    const updatedTodos = [...todos]
    updatedTodos[index].isDone = !updatedTodos[index].isDone
    setTodos(updatedTodos)
  }

  return (
    <div className='note-todos' style={style}>
      <h2>{title}</h2>
      <h3>{createdAt}</h3>
      {todos.map((todo, index) => (
        <label
          htmlFor={todo.txt}
          key={index}
          className={todo.isDone ? 'done' : ''}
        >
          <input
            id={todo.txt}
            type='checkbox'
            checked={todo.isDone}
            onChange={() => handleOnChange(index)}
          />
          {(!todo.isDone && (
            <a className='material-icons-outlined md-18'>
              check_box_outline_blank
            </a>
          )) || <span className='material-icons-outlined'>check_box</span>}
          {todo.txt}
        </label>
      ))}
    </div>
  )
}
