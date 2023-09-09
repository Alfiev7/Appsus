import { noteService } from '../services/note.service.js'
import { LongTxt } from './LongTxt.jsx'

export function NoteTxt({ id, createdAt, info, type }) {
  const { txt, title } = info

  function onUpdateTxt({ target: { textContent: newTxt } }) {
    noteService.updateNoteContent(id, type, newTxt, title)
  }

  return (
    <div className='note-txt'>
      <p onInput={onUpdateTxt} contentEditable suppressContentEditableWarning={true}>
        <LongTxt txt={txt} />
      </p>
    </div>
  )
}
