export function TodoItem({ todo, index, todoHandleFuncs: { handleOnChange, onUpdateTxt, onRemoveTodo } }) {
  const { txt, isDone, doneAt } = todo
  return (
    <div className='todo-item' key={index}>
      <input id={txt} type='checkbox' checked={isDone} onChange={() => handleOnChange(index)} />

      <div className='todo-line'>
        {isDone ? (
          <a
            className='material-icons-outlined icon'
            onClick={() => handleOnChange(index, todo)}
            title='Unmark as done'
          >
            check_box
          </a>
        ) : (
          <a className='material-icons-outlined icon' onClick={() => handleOnChange(index, todo)} title='Mark as done'>
            check_box_outline_blank
          </a>
        )}
        <div className='done-at-container'>
          <span
            className={isDone ? 'todo-txt done' : 'todo-txt'}
            onInput={ev => onUpdateTxt(ev, index)}
            contentEditable
            suppressContentEditableWarning={true}
            title='Edit todo'
          >
            {txt}
          </span>
          {isDone && <pre className='todo-done-at'>{doneAt}</pre>}
        </div>
        <a className='material-icons-outlined icon icon-remove' onClick={() => onRemoveTodo(index)} title='Remove todo'>
          close
        </a>
      </div>
    </div>
  )
}
