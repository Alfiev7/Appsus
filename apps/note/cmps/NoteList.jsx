import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
  console.log('NOTE LIST')

  return (
    <ul className='note-list'>
      {notes.map(note => (
        <li key={note.id}>
          <NotePreview note={note} />
        </li>
      ))}
    </ul>
  )
}
