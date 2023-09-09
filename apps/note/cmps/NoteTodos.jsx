import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { todoService } from '../services/todo.service.js'
import { TodoItem } from './TodoItem.jsx'

const { useState, useRef } = React

export function NoteTodos({ id, createdAt, info, type }) {
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
    todoService.addTodo(todoToAdd, id, setTodos)
    editRef.current.textContent = 'Todo item..'
    showSuccessMsg('Added todo')
  }

  function onRemoveTodo(index) {
    todoService.removeTodo(index, id, setTodos)
    showSuccessMsg('Removed todo')
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
    <div className='note-todos'>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} todoHandleFuncs={todoHandleFuncs} />
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
    </div>
  )
}
