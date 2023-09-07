import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'

export function NoteTxt({
  id,
  createdAt,
  isPinned,
  style,
  info,
  type,
  onUpdateTitle,
}) {
  const { txt, title } = info

  function onUpdateTxt({ target: { textContent: newTxt } }) {
    noteService.updateNoteContent(id, type, newTxt, title)
  }

  return (
    <div className='note-txt' style={style}>
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
