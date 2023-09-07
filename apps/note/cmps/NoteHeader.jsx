export function NoteHeader({ note, onUpdateTitle, onPinNote }) {
  const {
    id,
    info: { title },
  } = note
  return (
    <div className='note-header'>
      <a
        className='material-symbols-outlined icon icon-pushpin'
        onClick={() => onPinNote(id)}
        title='Pin note'
      >
        push_pin
      </a>
      <h3
        onInput={onUpdateTitle}
        contentEditable
        suppressContentEditableWarning={true}
        title='Edit title'
      >
        {title}
      </h3>
    </div>
  )
}
