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
      >
        push_pin
      </a>
      <h2
        onInput={onUpdateTitle}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {title}
      </h2>
    </div>
  )
}
