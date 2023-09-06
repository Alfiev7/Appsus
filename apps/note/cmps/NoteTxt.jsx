import { noteService } from '../services/note.service.js'

export function NoteTxt({ id, createdAt, isPinned, style, info, type }) {
  const { txt, title } = info

  function onUpdateTxt({ target: { textContent: newTxt } }) {
    noteService.updateNoteContent(id, type, newTxt, title)
  }

  function onUpdateTitle({ target: { textContent: newTitle } }) {
    noteService.updateNoteContent(id, type, txt, newTitle)
  }

  return (
    <div className='note-txt' style={style}>
      <h2
        onInput={onUpdateTitle}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {title}
      </h2>
      <p
        onInput={onUpdateTxt}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {txt}
      </p>
      <pre className='last-edit'>Last edit: {createdAt}</pre>
    </div>
  )
}
