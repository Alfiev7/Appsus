import { noteService } from '../services/note.service.js'

const { useState } = React

export function NoteTodos({ id, createdAt, isPinned, style, info, type }) {
  const [todos, setTodos] = useState(info.todos)
  const { title } = info

  function handleOnChange(index) {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos]
      updatedTodos[index] = {
        ...updatedTodos[index],
        isDone: !updatedTodos[index].isDone,
      }
      return updatedTodos
    })
  }

  function onUpdateTxt({ target: { textContent: newTxt } }, index) {
    noteService.updateNoteContent(id, type, newTxt, null, index)
  }

  function onUpdateTitle({ target: { textContent: newTitle } }) {
    noteService.updateNoteContent(id, type, null, newTitle)
  }

  return (
    <div className='note-todos' style={style}>
      <h2
        onInput={onUpdateTitle}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {title}
      </h2>
      <h3>{createdAt}</h3>
      {todos.map((todo, index) => (
        <div key={index}>
          <input
            id={todo.txt}
            type='checkbox'
            checked={todo.isDone}
            onChange={() => handleOnChange(index)}
          />

          <div className='todo-line'>
            {!todo.isDone ? (
              <a
                className='material-icons-outlined icon'
                onClick={() => handleOnChange(index, todo)}
              >
                check_box_outline_blank
              </a>
            ) : (
              <a
                className='material-icons-outlined icon'
                onClick={() => handleOnChange(index, todo)}
              >
                check_box
              </a>
            )}
            <span
              className={todo.isDone ? 'done' : ''}
              onInput={ev => onUpdateTxt(ev, index)}
              contentEditable
              suppressContentEditableWarning={true}
            >
              {todo.txt}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
