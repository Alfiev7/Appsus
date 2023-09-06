import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
  console.log('NOTE LIST')

  return (
    <div className='note-list'>
      {notes.map(note => (
        <React.Fragment key={note.id}>
          <NotePreview note={note} />
        </React.Fragment>
      ))}
    </div>
  )
}
