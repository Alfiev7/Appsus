import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
  console.log('NOTE LIST')

  return (
    <ul className='note-list'>
      {notes.map(note => (
        <React.Fragment key={note.id}>
          <li>
            <NotePreview note={note} />
          </li>
          <button>
            <i icon='fa-regular fa-trash-can' style={{ color: '#000000' }} />
          </button>
        </React.Fragment>
      ))}
    </ul>
  )
}
