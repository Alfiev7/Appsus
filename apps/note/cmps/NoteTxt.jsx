import { noteService } from '../services/note.service.js'
import { LongTxt } from './LongTxt.jsx'

export function NoteTxt({ id, createdAt, isPinned, style, info, type }) {
  const { txt, title } = info

  function onUpdateTxt({ target: { textContent: newTxt } }) {
    noteService.updateNoteContent(id, type, newTxt, title)
  }

  return (
    <div className='note-txt' style={style}>
      <p onInput={onUpdateTxt} contentEditable suppressContentEditableWarning={true}>
        {/* {txt} */}
        <LongTxt txt={txt} />
      </p>
      <pre className='last-edit'>Last edit: {createdAt}</pre>
    </div>
  )
}
