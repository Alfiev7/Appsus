export function TodoItem({
  todo,
  index,
  todoHandleFuncs: { handleOnChange, onUpdateTxt, onRemoveTodo },
}) {
  return (
    <div className='todo-item' key={index}>
      <input
        id={todo.txt}
        type='checkbox'
        checked={todo.isDone}
        onChange={() => handleOnChange(index)}
      />

      <div className='todo-line'>
        {todo.isDone ? (
          <a
            className='material-icons-outlined icon'
            onClick={() => handleOnChange(index, todo)}
            title='Unmark as done'
          >
            check_box
          </a>
        ) : (
          <a
            className='material-icons-outlined icon'
            onClick={() => handleOnChange(index, todo)}
            title='Mark as done'
          >
            check_box_outline_blank
          </a>
        )}
        <div className='done-at-container'>
          <span
            className={todo.isDone ? 'todo-txt done' : 'todo-txt'}
            onInput={ev => onUpdateTxt(ev, index)}
            contentEditable
            suppressContentEditableWarning={true}
            title='Edit todo'
          >
            {todo.txt}
          </span>
          {todo.isDone && <pre className='todo-done-at'>{todo.doneAt}</pre>}
        </div>
        <a
          className='material-icons-outlined icon icon-remove'
          onClick={() => onRemoveTodo(index)}
          title='Remove todo'
        >
          close
        </a>
      </div>
    </div>
  )
}
