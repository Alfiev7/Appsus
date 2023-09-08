import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { TodoItem } from './TodoItem.jsx'

const { useState, useRef } = React

export function NoteTodos({ id, createdAt, isPinned, style, info, type }) {
  const [todos, setTodos] = useState(info.todos)
  const editRef = useRef(null)

  function handleOnChange(index) {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos]
      updatedTodos[index] = {
        ...updatedTodos[index],
        isDone: !updatedTodos[index].isDone,
        doneAt: utilService.getFormattedDate(),
      }
      return updatedTodos
    })
  }

  function onAddTodo({ target: { textContent: todoToAdd } }) {
    if (!todoToAdd) {
      editRef.current.textContent = 'Todo item..'
      return
    }
    noteService
      .get(id)
      .then(note => {
        const newTodo = { txt: todoToAdd, isDone: false, doneAt: null }
        note.info.todos.push(newTodo)
        return noteService.save(note).then(() => newTodo)
      })
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo])
        editRef.current.textContent = 'Todo item..'
      })
      .catch(error => {
        console.error("Couldn't add todo:", error)
      })
  }

  function onRemoveTodo(index) {
    noteService
      .get(id)
      .then(note => {
        note.info.todos.splice(index, 1)
        return noteService.save(note)
      })
      .then(setTodos(prevTodos => prevTodos.filter((_, idx) => idx !== index)))
      .catch(err => {
        console.error("Couldn't remove todo:", err)
      })
  }

  function onUpdateTxt({ target: { textContent: newTxt } }, index) {
    noteService.updateNoteContent(id, type, newTxt, null, index)
  }

  const todoHandleFuncs = {
    handleOnChange,
    onRemoveTodo,
    onUpdateTxt,
  }

  return (
    <div className='note-todos' style={style}>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          todoHandleFuncs={todoHandleFuncs}
        />
      ))}
      <div className='add-todo-line'>
        <a className='material-icons-outlined icon icon-add'>add</a>
        <span
          className='add-todo'
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={onAddTodo}
          onFocus={ev => (ev.target.textContent = '')}
          title='Add a todo'
          ref={editRef}
        >
          Todo item..
        </span>
      </div>
      <pre className='last-edit'>Last edit: {createdAt}</pre>
    </div>
  )
}
